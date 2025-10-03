// src/Modules/Contracts/TaskFlow/data/mockTasks.js

/**
 * Estructura de MOCK para el flujo de tareas.
 * Usada por OnboardingTaskPage.jsx para inicializar el estado.
 */
export const MOCK_TASKS = [
  {
    id: "section-legal",
    title: "Fase 1: Constitución Legal",
    tasks: [
      {
        id: "task-101",
        title: "Formulario de Constitución",
        status: "active", // <- La tarea que se carga inicialmente
        component: "ConstitutionForm",
        data: {
          // Datos precargados o guardados previamente
          nombreCompania: "BDO Global Services S.A.",
        },
      },
      {
        id: "task-102",
        title: "Definición de Socios y Capital",
        status: "pending",
        component: "SocietyTypeSelector",
        data: {},
      },
      {
        id: "task-103",
        title: "Aprobación de Nombre y Reserva",
        status: "pending",
        component: "NameApprovalForm",
        data: {},
      },
    ],
  },
  {
    id: "section-finance",
    title: "Fase 2: Trámites Financieros",
    tasks: [
      {
        id: "task-201",
        title: "Subida de Comprobante de Pago",
        status: "pending",
        component: "PaymentUploader",
        data: {},
      },
      {
        id: "task-202",
        title: "Creación de Cuentas Bancarias",
        status: "pending",
        component: "BankAccountSetup",
        data: {},
      },
    ],
  },
  {
    id: "section-closing",
    title: "Fase 3: Cierre y Entrega",
    tasks: [
      {
        id: "task-301",
        title: "Firma de Documentos Finales",
        status: "pending",
        component: "FinalSigning",
        data: {},
      },
    ],
  },
];
