import type { JwtPayload } from "jsonwebtoken";
import config from "../config";
import axios from "axios";
import { prisma } from "../lib/prisma";

const initiatePaymentIntoDB = async (
  rentalRequestId: string,
  tenantId: string,
) => {
  const tenant = await prisma.user.findUniqueOrThrow({
    where: {
      id: tenantId,
    },
  });

  const property = await prisma.rentalRequest.findUniqueOrThrow({
    where: {
      id: rentalRequestId,
    },
    include: {
      property: true,
    },
  });

  if (property.status !== "APPROVED") {
    throw new Error("Rental request is not approved yet.");
  }

  const tranId = `TRNX_ID_${Date.now()}`;

  const paymentData = {
    store_id: config.ssl_commerz_store_id,
    store_passwd: config.ssl_commerz_store_password,
    total_amount: 100,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${config.app_url}/api/payments/confirm?rentalRequestId=${rentalRequestId}&tranId=${tranId}&status=success`,
    fail_url: `${config.app_url}/api/payments/confirm?rentalRequestId=${rentalRequestId}&tranId=${tranId}&status=fail`,
    cancel_url: `${config.app_url}/api/payments/confirm?rentalRequestId=${rentalRequestId}&tranId=${tranId}&status=cancel`,
    cus_name: tenant?.name,
    cus_email: tenant?.email,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: 1000,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    paymentData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const data = await response.data;

  await prisma.payment.create({
    data: {
      transactionId: tranId,
      rentalRequestId: rentalRequestId,
      tenantId: tenant?.id,
      amount: property?.property?.price,
      status: "PENDING",
    },
  });

  const GatewayPageURL = data?.GatewayPageURL;

  return GatewayPageURL;
};

const validatePayment = async (
  propertyId: string,
  tranId: string,
  status: string,
  payload: Record<string, unknown>,
) => {
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config.ssl_commerz_store_id}&store_passwd=${config.ssl_commerz_store_password}&format=json`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const data = await response.data;

  if (data.status === "VALID") {
    await prisma.rentalRequest.update({
      where: {
        id: propertyId,
      },
      data: {
        status: "APPROVED",
      },
    });

    await prisma.payment.update({
      where: {
        transactionId: tranId,
      },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
      },
    });
  }

  return status;
};

const getMyPaymentsFromDB = async (tenantId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      tenantId,
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

export const paymentService = {
  initiatePaymentIntoDB,
  validatePayment,
  getMyPaymentsFromDB,
};
