export const VehicleInfo = (
    maturityDate,
    leaseType, 
    leaseName,
    accountType,
    accountNumber,
    remainingPayments,
    Colour,
    image) => { 
    return {
    maturityDate:maturityDate, 
    leaseType:leaseType,
    leaseName:leaseName, 
    accountType:accountType,
    accountNumber:accountNumber, remainingPayments:remainingPayments,
    Colour: Colour,
    image:image,
    }
    }