export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 1,
    title: "Constitución de Sociedad",
    state: "IN_PROGRESS",
    tasks: [
      {
        taskId: 101,
        label: "Solicitud del servicio",
        status: "COMPLETED",
        form: {
          fields: [
            {
              name: "fechaSolicitud",
              label: "Fecha de Solicitud",
              type: "date",
              value: "2024-10-01",
            },
            {
              name: "servicioSeleccionado",
              label: "Servicio",
              type: "text",
              value: "Constitución de Sociedad",
              readOnly: true,
            },
          ],
        },
      },
      {
        taskId: 102,
        label: "Formulario de constitución",
        status: "IN_PROGRESS",
        form: {
          fields: [
            {
              name: "nombreSocio",
              label: "Nombre del Socio Principal",
              type: "text",
              value: "Juan Pérez",
            },
            {
              name: "tipoSociedad",
              label: "Tipo de Sociedad",
              type: "select",
              options: ["SRL", "SA", "Cooperativa"],
              value: "SRL",
            },
            {
              name: "capitalSocial",
              label: "Capital Social ($)",
              type: "number",
              value: 15000,
            },
            {
              name: "documentoIdentidad",
              label: "Documento de Identidad del Socio",
              type: "file",
              value: null,
            },
          ],
        },
      },
      {
        taskId: 103,
        label: "Pago de la factura",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "montoFactura",
              label: "Monto a Pagar ($)",
              type: "number",
              value: 500,
              readOnly: true,
            },
            {
              name: "metodoPago",
              label: "Método de Pago",
              type: "select",
              options: ["Tarjeta", "Transferencia", "Efectivo"],
              value: "",
            },
            {
              name: "comprobantePago",
              label: "Adjuntar Comprobante",
              type: "file",
              value: null,
            },
          ],
        },
      },
    ],
  },
  {
    serviceId: 2,
    title: "Inscripción en Hacienda",
    state: "PENDING",
    tasks: [
      {
        taskId: 201,
        label: "Solicitud de inscripción RUC",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "nombreEmpresa",
              label: "Razón Social de la Empresa",
              type: "text",
              value: "",
            },
            {
              name: "tipoContribuyente",
              label: "Tipo de Contribuyente",
              type: "radio",
              options: ["Persona Física", "Sociedad"],
              value: "Sociedad",
            },
            {
              name: "actividadEconomica",
              label: "Actividad Económica",
              type: "text",
              value: "",
            },
            {
              name: "documentosAdjuntos",
              label: "Adjuntar Documentos Legales",
              type: "file",
              value: null,
            },
          ],
        },
      },
      {
        taskId: 202,
        label: "Asignación de número de RUC",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "rucAsignado",
              label: "Número RUC Asignado",
              type: "text",
              value: "",
              readOnly: true,
            },
            {
              name: "fechaAsignacion",
              label: "Fecha de Asignación",
              type: "date",
              value: "",
              readOnly: true,
            },
          ],
        },
      },
    ],
  },
  {
    serviceId: 3,
    title: "Inscripción en Bancos",
    state: "PENDING",
    tasks: [
      {
        taskId: 301,
        label: "Apertura de cuenta",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "nombreBanco",
              label: "Banco de Preferencia",
              type: "text",
              value: "",
            },
            {
              name: "tipoCuenta",
              label: "Tipo de Cuenta",
              type: "select",
              options: ["Corriente", "Ahorros"],
              value: "Corriente",
            },
            {
              name: "moneda",
              label: "Moneda",
              type: "radio",
              options: ["USD", "EUR", "Local"],
              value: "Local",
            },
            {
              name: "documentosAdjuntos",
              label: "Adjuntar Certificación",
              type: "file",
              value: null,
            },
          ],
        },
      },
      {
        taskId: 302,
        label: "Entrega de chequera",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "chequeraRecibida",
              label: "¿Chequera recibida?",
              type: "checkbox",
              value: false,
            },
            {
              name: "fechaEntrega",
              label: "Fecha de Entrega Estimada",
              type: "date",
              value: "",
            },
          ],
        },
      },
    ],
  },
];
