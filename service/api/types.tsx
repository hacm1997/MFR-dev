export type PostDataResources = {
    code: string;
    name: string;
    description: string;
    characteristics: any;
    owner: string;
    rating: number,
    rating_count: number,
    price: number,
    currency: string,
    state: string
}

export type updateDataResource = {
 owner: string;
 characteristics: any;
 code: string;
 price: number;
 name: string;
 rating: number;
 description: string;
 currency: string;
 state: string;
 rating_count: number
}

export type createBooking = {
    tenant: string;
    user: {
        dni: string;
        name: string;
        email: string;
        cellphone: string;
        details: {
            code: string;
            value: string;
            description: string;
        }
      };
      booking: {
        status: string;
        code: string;
        details: any;
        resource_code: string;
        start_date: string;
        end_date: string
      }
}

export type updateBooking = {
    tenant: string;
    user: any;
    booking: any;
}

export type createPayment = {
    tenant: string;
    bookingCode: string;
    resourceCode: string;
    userDni: string;
    method: string;
    startDate: string;
    endDate: string;
    facture: {
        reference: string;
        booking_code: string;
        status: string;
        details: any;
        total: number;
    }
}

export type credentials = {
    code: string;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiryDate: number | undefined;
    tokenType: string | undefined;
}

/* FORM SERVICE NOTIFIER */
export type PostData = {
    tenant: string;
    form_ref: string;
    created_at: string;
    comm_pref: Array<string>;
    form_data: any;
}
