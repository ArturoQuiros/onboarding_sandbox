// src/modules/contractFlow/data/checklistMock.js

export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 1,
    title: "Constitución de Sociedad",
    state: "IN_PROGRESS", // IN_PROGRESS, COMPLETED, PENDING
    tasks: [
      {
        taskId: 101,
        label: "Solicitud del servicio",
        status: "COMPLETED",
        active: false,
      },
      {
        taskId: 102,
        label: "Selección del tipo de sociedad",
        status: "COMPLETED",
        active: false,
      },
      {
        taskId: 103,
        label: "Formulario de constitución",
        status: "ACTIVE",
        active: true,
      }, // Tarea Activa
      {
        taskId: 104,
        label: "Pago de la factura y envío de comprobante",
        status: "PENDING",
        active: false,
      },
      {
        taskId: 105,
        label: "Notificación al cliente",
        status: "PENDING",
        active: false,
      },
      {
        taskId: 106,
        label: "Recoger firmas en libros y certificados",
        status: "PENDING",
        active: false,
      },
      {
        taskId: 107,
        label: "Notificación al cliente y entrega de libros",
        status: "PENDING",
        active: false,
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
        active: false,
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
        active: false,
      },
    ],
  },
];
