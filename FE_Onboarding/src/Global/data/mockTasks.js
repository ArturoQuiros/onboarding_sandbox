export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 1,
    title: "Constitución de Sociedad",
    state: "IN_PROGRESS",
    tasks: [
      { taskId: 101, label: "Solicitud del servicio", status: "COMPLETED" },
      {
        taskId: 102,
        label: "Selección del tipo de sociedad",
        status: "COMPLETED",
      },
      {
        taskId: 103,
        label: "Formulario de constitución",
        status: "IN_PROGRESS",
      },
      {
        taskId: 104,
        label: "Pago de la factura y envío de comprobante",
        status: "PENDING",
      },
      { taskId: 105, label: "Notificación al cliente", status: "PENDING" },
      {
        taskId: 106,
        label: "Recoger firmas en libros y certificados",
        status: "PENDING",
      },
      {
        taskId: 107,
        label: "Notificación al cliente y entrega de libros",
        status: "PENDING",
      },
    ],
  },
  {
    serviceId: 2,
    title: "Inscripción en Hacienda",
    state: "PENDING",
    tasks: [
      { taskId: 201, label: "Solicitud de inscripción RUC", status: "PENDING" },
      {
        taskId: 202,
        label: "Revisión de documentos fiscales",
        status: "PENDING",
      },
      { taskId: 203, label: "Asignación de número de RUC", status: "PENDING" },
    ],
  },
  {
    serviceId: 3,
    title: "Inscripción en Bancos",
    state: "PENDING",
    tasks: [
      { taskId: 301, label: "Apertura de cuenta", status: "PENDING" },
      {
        taskId: 302,
        label: "Entrega de chequera y tarjetas",
        status: "PENDING",
      },
    ],
  },
  {
    serviceId: 4,
    title: "Registro de Marca",
    state: "PENDING",
    tasks: [
      {
        taskId: 401,
        label: "Búsqueda de disponibilidad de marca",
        status: "PENDING",
      },
      {
        taskId: 402,
        label: "Solicitud de registro ante registro de marcas",
        status: "PENDING",
      },
      { taskId: 403, label: "Pago de tasas y seguimiento", status: "PENDING" },
    ],
  },
  {
    serviceId: 5,
    title: "Trámites Laborales",
    state: "PENDING",
    tasks: [
      { taskId: 501, label: "Registro de planilla en CCSS", status: "PENDING" },
      { taskId: 502, label: "Afiliación de empleados", status: "PENDING" },
      {
        taskId: 503,
        label: "Entrega de comprobantes al cliente",
        status: "PENDING",
      },
    ],
  },
];
