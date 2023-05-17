import moment from "moment/moment";
import config from "../infrastructure/config";
import {formService} from "./api/api";
import Swal from "sweetalert2";

export default function NotifierEmailBooked(data:any, reference:any, bookingCode:any, emailUser:any, t:any){
    const currentDay = moment.utc().toJSON();

    const dataSend = {
        name: "MFR",
        email: emailUser,
        apto: data.facture.details?.name,
        booking_code: bookingCode,
        reference: reference,
        start_date: moment(data.startDate).format("DD-MM-YYY"),
        end_date: moment(data.endDate).format("DD-MM-YYY"),
        transaction_date: data.facture.details?.dateTransaction,
        total_price: data.facture.total,
        payment_method: data.facture.details?.method,
        status: data.facture.details?.status
    }

    const notification = {
        tenant: config.TENANT as string,
        form_ref: "MFRNotifier",
        created_at: currentDay,
        comm_pref: ["email"],
        form_data: dataSend,
        comm_options: {
            transport: {
                host: process.env.NEXT_PUBLIC_MAILER_HOST as string,
                auth:{user: process.env.NEXT_PUBLIC_MAILER_SENDER as string, pass: process.env.NEXT_PUBLIC_PASSWORD as string}
            },
            mail: {
                from: `${t('booked.from')} - Inmobiliaria MFR` + '<' + process.env.NEXT_PUBLIC_MAILER_SENDER as string + '>',
                subject: `${t('booked.subject')} ${dataSend.apto}`,

                html: `<h1>${t('booked.title')}</h1>`
                    + `<p><strong>${t('booked.info')}:</strong></p>`
                    + `<li>${t('booked.code_booking')}: ` + `${dataSend.booking_code}` + "</li>"
                    + `<li># ${t('booked.ref')}: ` + `${dataSend.reference}` + "</li>"
                    + `<li>${t('booked.date')}: ` + `${dataSend.transaction_date}` + "</li>"
                    + `<li>${t('booked.apto')}: ` + `${dataSend.apto}` + "</li>"
                    + `<li>${t('booked.date_start')}: ` + `${dataSend.start_date}` + "</li>"
                    + `<li>${t('booked.date_end')}: ` + `${dataSend.end_date}` + "</li>"
                    + `<li>${t('booked.total')}: ` + `${dataSend.total_price}` + "</li>"
                    + `<li>${t('booked.method')}: ` + `${dataSend.payment_method}` + "</li>"
                    + `<li>${t('booked.status')}: ` + `${dataSend.status}` + "</li>"
            }
        }
    }

    formService(notification).then(resp => {
        console.log(resp);
        if (resp.status === 201) {
            console.log("success! notification send");
        }
    }).catch(( e: any ) => {
        console.log("no se pudo enviar");
        console.log(e);
    });
}

export function CancelBooked(data:any, translate:any){
    const currentDay = moment.utc().toJSON();

    const notification = {
        tenant: config.TENANT as string,
        form_ref: "MFRNotifier",
        created_at: currentDay,
        comm_pref: ["email"],
        form_data: data,
        comm_options: {
            transport: {
                host: process.env.NEXT_PUBLIC_MAILER_HOST as string,
                auth:{user: process.env.NEXT_PUBLIC_MAILER_SENDER as string, pass: process.env.NEXT_PUBLIC_PASSWORD as string}
            },
            mail: {
                from: "Solicitud de Cancelación de Reserva - Inmobiliaria MFR" + '<' + process.env.NEXT_PUBLIC_MAILER_SENDER as string + '>',
                subject: `Cancelación de reserva`,

                html: "<h1>Datos del solicitante:</h1>"
                    + "<p><strong>Información general:</strong></p>"
                    + "<li>Código de reserva: " + `${data.code}` + "</li>"
                    + "<li>Fecha de inicio de la reserva: " + `${data.dni}` + "</li>"
                    + "<li>Nombre del usuario: " + `${data.name}` + "</li>"
                    + "<li>Correo electrónico: " + `${data.email_user}` + "</li>"
                    + "<li>Teléfono/Celular: " + `${data.phone}` + "</li>"
            }
        }
    }

    formService(notification).then(resp => {
        console.log(resp);
        if (resp.status === 201) {
            console.log("success! notification send");
            Swal.fire(
                {
                    title: `!${translate('cancel.messages.success.title')}!`,
                    text: `${translate('cancel.messages.success.text')}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }
            )
        }
    }).catch(( e: any ) => {
        console.log("no se pudo enviar");
        Swal.fire(
            {
                title: `!${translate('cancel.messages.error.title')}!`,
                text: `${translate('cancel.messages.error.text')}`,
                icon: 'error',
                confirmButtonText: 'OK'
            }
        )
        console.log(e);
    });
}
