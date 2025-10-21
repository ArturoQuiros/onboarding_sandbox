export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 1,
    title: "Know Your Customer (KYC)",
    state: "REVIEW", // Estado del servicio en revisión
    tasks: [
      {
        taskId: 1,
        label: "Formulario KYC - Información General",
        status: "SUBMITTED_FOR_REVIEW", // Estado que indica que el cliente finalizó y el Staff debe revisar
        assignedTo: "John Doe", // Quién debe revisarla
        observation: "Falta adjuntar el Certificado de Domicilio Fiscal.", // Observación inicial del Staff
        reviewerId: 45,
        form: {
          title: "Formulario KYC",
          description: "Este formulario es para conocer al cliente",
          fields: [
            {
              name: "legalName",
              label: "Legal Name",
              type: "text",
              required: true,
            },
            {
              name: "tradeName",
              label: "Trade Name or other used name",
              type: "text",
              required: true,
            },
            {
              name: "economicActivity",
              label: "Company’s economic activity",
              type: "text",
              required: true,
            },
            {
              name: "companyAddress",
              label: "Company Address",
              type: "text",
              required: true,
            },
            {
              name: "regulatedCompany",
              label: "Regulated Company",
              type: "radio",
              options: ["Yes", "No"],
              required: true,
            },
            {
              name: "listedOnStockExchange",
              label: "Listed on the Stock Exchange",
              type: "radio",
              options: ["Yes", "No"],
            },
            {
              name: "legalIdNumber",
              label: "Legal Identification Number",
              type: "text",
            },
            {
              name: "physicalIdNumber",
              label: "Physical Identification Number",
              type: "text",
            },
            {
              name: "hasParentCompany",
              label: "Does your company have an Ultimate Parent Company?",
              type: "radio",
              options: ["Yes", "No"],
              required: true,
            },
            {
              name: "parentCompanyName",
              label: "If yes, please provide the name",
              type: "text",
            },
            {
              name: "subsidiaryInternational",
              label: "Subsidiary of an International Company",
              type: "radio",
              options: ["Yes", "No"],
            },
            {
              name: "internationalOperations",
              label: "Company with International Operations",
              type: "radio",
              options: ["Yes", "No"],
            },
            {
              name: "contactPerson",
              label: "Contact Person (First and Last Name)",
              type: "text",
              required: true,
            },
            { name: "jobTitle", label: "Job Title", type: "text" },
            {
              name: "phoneNumber",
              label: "Phone Number",
              type: "text",
              required: true,
            },
            {
              name: "email",
              label: "Email for notifications and invoices",
              type: "email",
              required: true,
            },
            { name: "website", label: "Website", type: "text" },
            {
              name: "countryIncorporated",
              label: "Country where the company was incorporated",
              type: "text",
            },
            {
              name: "previousAuditors",
              label: "Previous Auditors",
              type: "text",
            },
            { name: "companyLawyers", label: "Company Lawyers", type: "text" },
          ],
        },
        // ✅ NUEVO: Datos llenados por el cliente (para DynamicFormReadOnly)
        submittedForm: {
          title: "Formulario KYC",
          description: "Este formulario es para conocer al cliente",
          fields: [
            {
              name: "legalName",
              label: "Legal Name",
              type: "text",
              value: "BDO Software S.A.",
            },
            {
              name: "tradeName",
              label: "Trade Name or other used name",
              type: "text",
              value: "BDO Latam Tech",
            },
            {
              name: "economicActivity",
              label: "Company’s economic activity",
              type: "text",
              value: "Desarrollo de Software",
            },
            {
              name: "companyAddress",
              label: "Company Address",
              type: "text",
              value: "San José, Costa Rica, Torre BDO",
            },
            {
              name: "regulatedCompany",
              label: "Regulated Company",
              type: "radio",
              options: ["Yes", "No"],
              value: "No",
            },
            {
              name: "listedOnStockExchange",
              label: "Listed on the Stock Exchange",
              type: "radio",
              options: ["Yes", "No"],
              value: "No",
            },
            {
              name: "legalIdNumber",
              label: "Legal Identification Number",
              type: "text",
              value: "3-101-555555",
            },
            {
              name: "physicalIdNumber",
              label: "Physical Identification Number",
              type: "text",
              value: "11888-0909",
            },
            {
              name: "hasParentCompany",
              label: "Does your company have an Ultimate Parent Company?",
              type: "radio",
              options: ["Yes", "No"],
              value: "Yes",
            },
            {
              name: "parentCompanyName",
              label: "If yes, please provide the name",
              type: "text",
              value: "BDO Global Holdings",
            },
            {
              name: "subsidiaryInternational",
              label: "Subsidiary of an International Company",
              type: "radio",
              options: ["Yes", "No"],
              value: "Yes",
            },
            {
              name: "internationalOperations",
              label: "Company with International Operations",
              type: "radio",
              options: ["Yes", "No"],
              value: "Yes",
            },
            {
              name: "contactPerson",
              label: "Contact Person (First and Last Name)",
              type: "text",
              value: "Maria López",
            },
            {
              name: "jobTitle",
              label: "Job Title",
              type: "text",
              value: "Directora de Operaciones",
            },
            {
              name: "phoneNumber",
              label: "Phone Number",
              type: "text",
              value: "+506 2200-1000",
            },
            {
              name: "email",
              label: "Email for notifications and invoices",
              type: "email",
              value: "contacto@bdo.cr",
            },
            {
              name: "website",
              label: "Website",
              type: "text",
              value: "www.bdo.cr",
            },
            {
              name: "countryIncorporated",
              label: "Country where the company was incorporated",
              type: "text",
              value: "Costa Rica",
            },
            {
              name: "previousAuditors",
              label: "Previous Auditors",
              type: "text",
              value: "KPMG",
            },
            {
              name: "companyLawyers",
              label: "Company Lawyers",
              type: "text",
              value: "BLP Abogados",
            },
          ],
        },
      },
      {
        taskId: 402,
        label: "Formulario KYC - Estructura de la Empresa",
        status: "SUBMITTED_FOR_REVIEW",
        assignedTo: "Jane Smith",
        form: {
          sections: [
            {
              title: "Shareholders",
              repeatable: true,
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "firstSurname", label: "First Surname", type: "text" },
                {
                  name: "secondSurname",
                  label: "Second Surname",
                  type: "text",
                },
                { name: "nationality", label: "Nationality", type: "text" },
                // ✅ NUEVO: Campo de archivo para la cédula
                { name: "idDocument", label: "ID Document", type: "file" },
              ],
            },
            {
              title: "Directors",
              repeatable: true,
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "firstSurname", label: "First Surname", type: "text" },
                {
                  name: "secondSurname",
                  label: "Second Surname",
                  type: "text",
                },
                { name: "nationality", label: "Nationality", type: "text" },
              ],
            },
          ],
        },
        // ✅ NUEVO: Datos llenados con secciones repetibles
        submittedForm: {
          sections: [
            {
              title: "Shareholders",
              // 💡 entryValues ya es un array de objetos con los datos llenados
              entries: [
                {
                  name: "Pedro",
                  firstSurname: "Sánchez",
                  secondSurname: "Ruiz",
                  nationality: "CR",
                  idDocument: { name: "pedro_id.pdf", url: "/api/files/1234" },
                },
                {
                  name: "Ana",
                  firstSurname: "Gómez",
                  secondSurname: "León",
                  nationality: "MX",
                  idDocument: { name: "ana_id.jpg", url: "/api/files/1235" },
                },
              ],
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "firstSurname", label: "First Surname", type: "text" },
                {
                  name: "secondSurname",
                  label: "Second Surname",
                  type: "text",
                },
                { name: "nationality", label: "Nationality", type: "text" },
                { name: "idDocument", label: "ID Document", type: "file" },
              ],
            },
            {
              title: "Directors",
              entries: [
                {
                  name: "Carlos",
                  firstSurname: "Mora",
                  secondSurname: "Solís",
                  nationality: "CR",
                },
              ],
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "firstSurname", label: "First Surname", type: "text" },
                {
                  name: "secondSurname",
                  label: "Second Surname",
                  type: "text",
                },
                { name: "nationality", label: "Nationality", type: "text" },
              ],
            },
          ],
        },
      },
      {
        taskId: 403,
        label: "Formulario KYC - Consentimiento e Información Adicional",
        status: "ACCEPTED", // Esta tarea ya fue revisada y aceptada
        assignedTo: "Jane Smith",
        form: {
          fields: [
            {
              name: "informedConsentText",
              label: "Informed Consent",
              type: "paragraph",
              readOnly: true,
              value: "...",
            },
            { name: "date", label: "Date", type: "date", required: true },
            {
              name: "importantComments",
              label: "Important Comments",
              type: "textarea",
            },
          ],
        },
        submittedForm: {
          title: "Consentimiento",
          fields: [
            {
              name: "informedConsentText",
              label: "Informed Consent",
              type: "paragraph",
              value:
                "We hereby inform you that the information required in this form...",
            },
            { name: "date", label: "Date", type: "date", value: "2025-10-18" },
            {
              name: "importantComments",
              label: "Important Comments",
              type: "textarea",
              value:
                "El cliente solicitó una reunión para discutir los términos de confidencialidad.",
            },
          ],
        },
      },
    ],
  },
];
