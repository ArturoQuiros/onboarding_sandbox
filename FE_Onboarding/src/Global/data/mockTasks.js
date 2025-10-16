export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 4,
    title: "Know Your Customer (KYC)",
    state: "PENDING",
    tasks: [
      {
        taskId: 401,
        label: "Formulario KYC - Información General",
        status: "PENDING",
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
      },
      {
        taskId: 402,
        label: "Formulario KYC - Estructura de la Empresa",
        status: "PENDING",
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
            {
              title: "Key Personnel",
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
            {
              title: "Beneficial Owners",
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
      },
      {
        taskId: 403,
        label: "Formulario KYC - Consentimiento e Información Adicional",
        status: "PENDING",
        form: {
          fields: [
            {
              name: "informedConsentText",
              label: "Informed Consent",
              type: "paragraph",
              readOnly: true,
              value:
                "We hereby inform you that the information required in this form by BDO Costa Rica will be handled in accordance with our policies: (i) the global firm’s policy, (ii) conflict of interest management policy, and (iii) risk and independence policy. This protocol is implemented under the highest ethical standards to protect our clients. We ensure the confidentiality and security of your data, which are essential for our Firm to comply with the processes for potential hiring and to ensure the absence of conflicts in the provision of our services. If you wish to exercise your right to information self-determination or if you have any inquiries, please direct them to privacidad@bdo.cr. More information at www.bdo.cr.",
            },
            { name: "date", label: "Date", type: "date", required: true },
            {
              name: "importantComments",
              label: "Important Comments",
              type: "textarea",
            },
          ],
        },
      },
    ],
  },
];
