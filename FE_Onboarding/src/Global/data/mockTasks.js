export const MOCK_CONTRACT_DATA = [
  {
    serviceId: 1,
    title: "Incorporation of a legal entity",
    state: "REVIEW", // Estado del servicio en revisión
    tasks: [
      {
        taskId: 1, // ⬅️ Tarea Única que combina las 3 anteriores
        label: "Know Your Client",
        status: "SUBMITTED_FOR_REVIEW",
        assignedTo: "John Doe",
        observation: "Falta adjuntar el Certificado de Domicilio Fiscal.", // Observación inicial del Staff
        reviewerId: 45,
        form: {
          title: "Formulario KYC Completo",
          description:
            "Este formulario contiene toda la información de Know Your Customer (KYC).",

          // 1. COMBINACIÓN DE CAMPOS SIMPLES (KYC - Información General y Consentimiento)
          fields: [
            // --- CAMPOS DE 'Información General' (Tarea 2 Original) ---
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

            // --- CAMPOS DE 'Consentimiento' (Tarea 403 Original) ---
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

          // 2. COMBINACIÓN DE SECCIONES REPETIBLES (KYC - Estructura de la Empresa)
          sections: [
            // --- SECCIONES DE 'Estructura de la Empresa' (Tarea 402 Original) ---
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

        // 3. COMBINACIÓN DE DATOS YA LLENADOS (submittedForm)
        submittedForm: {
          title: "Formulario KYC Consolidado",

          // Campos simples (de Tarea 2 y 403)
          fields: [
            // Tarea 2: Información General
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

            // Tarea 403: Consentimiento e Información Adicional
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

          // Secciones repetibles (de Tarea 402)
          sections: [
            {
              title: "Shareholders",
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
        taskId: 2,
        label: "Incorporation of a legal entity in CR",
        status: "SUBMITTED_FOR_REVIEW", // Estado que indica que el cliente finalizó y el Staff debe revisar
        assignedTo: "John Doe", // Quién debe revisarla
        observation: "Falta adjuntar el Certificado de Domicilio Fiscal.", // Observación inicial del Staff
        reviewerId: 45,
        form: {
          title: "Formulario KYC",
          description: "Este formulario es para conocer al cliente",
          fields: [
            // --- SECCIÓN 1.0 Domicilio y Notificaciones ---
            {
              name: "useBDOAddress",
              label: "1.0 Use BDO's address (with an additional annual charge)",
              type: "radio",
              options: ["Use BDO's address", "Use your own address"],
              required: true,
              description:
                "Select whether you want to use BDO's registered address for the company, which includes an additional annual charge, or your own business address in Costa Rica.",
            },
            {
              name: "businessAddress",
              label: "Business Address",
              type: "textarea",
              placeholder:
                "Province - Canton - District - Exact address with house/building number or color",
              required: true,
              description:
                "Provide the physical business address in Costa Rica. The address must include province, canton, district, and exact location details.",
              conditional: {
                field: "useBDOAddress",
                value: "Use your own address",
              },
            },
            {
              name: "notificationEmailRegistrationNote",
              label:
                "1.1 Use your own email - please include it below and we will register it before the Costa Rican judicial authorities",
              type: "note",
              description:
                "Use your own email - please include it below and we will register it before the Costa Rican judicial authorities",
              conditional: {
                field: "useBDOEmail",
                value: "Use your own e-mail",
              },
              // Ejemplo de styleType para una nota o encabezado menor
              styleType: "sub-header",
            },
            // --- SECCIÓN 1.2 Capital Social ---
            {
              name: "capitalOption",
              label: "1.2 Capital",
              type: "radio",
              options: [
                "¢10.000 colones (around $20)",
                "I want another capital stock",
              ],
              required: true,
              description:
                "No minimum required and can be expressed in foreign currency. We recommend an initial capital stock of ¢10.000 colones (around $20).",
              // Ejemplo de styleType para un separador de sección
              styleType: "section-header",
            },
            {
              name: "capitalAmount",
              label:
                "1.3 I want another capital stock - Please indicate the total capital stock you wish to establish",
              type: "text",
              placeholder: "Total capital stock (currency & amount)",
              required: true,
              conditional: {
                field: "capitalOption",
                value: "I want another capital stock",
              },
              description:
                "Please indicate the total capital stock you wish to establish for the incorporation. Kindly note that incorporation expenses will increase in proportion to the total amount of capital stock. In Costa Rica, once the entity is incorporated, you may subsequently increase the capital or record 'additional paid-in capital,' if preferred. Should you wish to have a session with your Key Account Manager to better understand these options, please use our WhatsApp button or the calendar feature to schedule a call.",
            },
            // --- SECCIÓN 1.4 Objeto Social (Business Nature) ---
            {
              name: "natureOption",
              label: "1.4 Nature",
              type: "radio",
              options: [
                "Our proposal: Trade in general, pledge or mortgage assets, dispose of all kinds of goods, yield bonds and guarantees, set up and administer trusts.",
                "I want another description of business nature",
              ],
              required: true,
              description:
                "At the time of incorporation, every company in Costa Rica must define its corporate purpose, which describes the lawful business activities the entity will engage in, the purpose must be: Lawful and of a commercial nature, consistent with the company's mercantile character. Clear and specific enough for the Registry to assess its legality, but broad enough to allow future business expansion. This clause establishes the legal scope of action of the company and determines the activities it is authorized to perform.",
              // Ejemplo de styleType para un separador de sección
              styleType: "section-header",
            },
            {
              name: "businessNatureDescription",
              label:
                "1.5 I want another description of business nature - Please provide information about the business nature you wish to include within the new entity's bylaws",
              type: "textarea",
              required: true,
              conditional: {
                field: "natureOption",
                value: "I want another description of business nature",
              },
            },
            // --- SECCIÓN 1.6 Accionistas/Socios ---
            {
              name: "shareholderCount",
              label: "1.6 Shareholders",
              type: "radio",
              options: ["One sole shareholder", "2 or more shareholders"],
              required: true,
              description: "How many shareholders will the entity have",
              // Ejemplo de styleType para un separador de sección
              styleType: "section-header",
            },
            {
              name: "shareholderNatureSingle",
              label:
                "1.7 One sole shareholder - Please select the nature of the shareholder",
              type: "select",
              options: [
                "Local Natural Person (with Cédula or CR Dimex)",
                "Foreign Natural Person (with Passport or other type of ID)",
                "Local Legal Entity",
                "Foreign Legal Entity",
                "Trust",
              ],
              required: true,
              conditional: {
                field: "shareholderCount",
                value: "One sole shareholder",
              },
            },
            {
              name: "shareholderNatureMultiple",
              label:
                "1.8 2 or more shareholders - Please select the nature of the shareholders",
              type: "select",
              options: [
                "Local Natural Persons (with Cédula or CR Dimex)",
                "Foreign Natural Person(s)",
                "Local Legal Entity(ies)",
                "Foreign Legal Entity(ies)",
                "Trust(s)",
              ],
              required: true,
              conditional: {
                field: "shareholderCount",
                value: "2 or more shareholders",
              },
            },
            // Grupos de detalles para un solo Accionista
            {
              name: "singleLocalNaturalPersonDetails",
              label:
                "1.9 One sole shareholder - Local Natural Person (with Cédula or CR Dimex)",
              type: "group",
              description: "Please provide the information shown in the chart",
              conditional: {
                field: "shareholderNatureSingle",
                value: "Local Natural Person (with Cédula or CR Dimex)",
              },
              fields: [
                {
                  name: "singleLocalFullName",
                  label: "Full name",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleLocalNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "singleLocalOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "singleLocalLegalStatus",
                  label: "Legal status (and number of nuptials if applicable)",
                  type: "text",
                },
                {
                  name: "singleLocalIdNumber",
                  label: "Valid ID/passport number with country of issuance",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleLocalAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            {
              name: "singleForeignNaturalPersonDetails",
              label: "1.10 One sole shareholder - Foreign Natural Person",
              type: "group",
              description: "Please provide the information shown in the chart",
              conditional: {
                field: "shareholderNatureSingle",
                value:
                  "Foreign Natural Person (with Passport or other type of ID)",
              },
              fields: [
                {
                  name: "singleForeignFullName",
                  label: "Full name",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleForeignNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "singleForeignOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "singleForeignLegalStatus",
                  label: "Legal status (if applicable)",
                  type: "text",
                },
                {
                  name: "singleForeignPassportNumber",
                  label: "Passport or ID number with country of issuance",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleForeignAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            {
              name: "singleLocalLegalEntityDetails",
              label: "1.11 One sole shareholder - Local Legal Entity",
              type: "group",
              description: "Please provide the information shown in the chart",
              conditional: {
                field: "shareholderNatureSingle",
                value: "Local Legal Entity",
              },
              fields: [
                {
                  name: "singleLocalEntityName",
                  label: "Entity name",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleLocalEntityId",
                  label: "Legal entity ID",
                  type: "text",
                },
                {
                  name: "singleLocalEntityAddress",
                  label: "Registered address",
                  type: "textarea",
                },
                {
                  name: "singleLocalEntityPercent",
                  label: "Ownership percentage",
                  type: "number",
                },
              ],
            },
            {
              name: "singleForeignLegalEntityDetails",
              label: "1.12 One sole shareholder - Foreign Legal Entity",
              type: "group",
              description: "Please provide the information shown in the chart",
              conditional: {
                field: "shareholderNatureSingle",
                value: "Foreign Legal Entity",
              },
              fields: [
                {
                  name: "singleForeignEntityName",
                  label: "Entity name",
                  type: "text",
                  required: true,
                },
                {
                  name: "singleForeignEntityId",
                  label: "Legal entity ID or registration",
                  type: "text",
                },
                {
                  name: "singleForeignEntityAddress",
                  label: "Registered address",
                  type: "textarea",
                },
                {
                  name: "singleForeignEntityPercent",
                  label: "Ownership percentage",
                  type: "number",
                },
              ],
            },
            {
              name: "singleTrustDetails",
              label: "1.13 One sole shareholder - Trust",
              type: "group",
              description: "Please provide the information shown in the chart",
              conditional: {
                field: "shareholderNatureSingle",
                value: "Trust",
              },
              fields: [
                {
                  name: "singleTrustName",
                  label: "Trust name",
                  type: "text",
                },
                {
                  name: "singleTrustDetailsText",
                  label: "Trust details",
                  type: "textarea",
                },
              ],
            },
            // Grupos de detalles para múltiples Accionistas (Arrays)
            {
              name: "multipleLocalNaturalPersonsDetails",
              label: "1.14 Shareholders - Local Natural Persons",
              type: "group",
              description:
                "Please provide the information shown in the chart for each of the shareholders and include their ownership percentage",
              conditional: {
                field: "shareholderNatureMultiple",
                value: "Local Natural Persons (with Cédula or CR Dimex)",
              },
              fields: [
                {
                  name: "localNaturalPersonsList",
                  label: "Local natural persons list",
                  type: "array",
                  itemFields: [
                    {
                      name: "name",
                      label: "Full name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "idNumber",
                      label: "ID number",
                      type: "text",
                    },
                    {
                      name: "ownershipPercentage",
                      label: "Ownership percentage",
                      type: "number",
                      required: true,
                      // Ejemplo de styleType para destacar un campo clave dentro del array
                      styleType: "highlight",
                    },
                  ],
                },
              ],
            },
            {
              name: "multipleForeignNaturalPersonsDetails",
              label: "1.15 Shareholders - Foreign Natural Persons",
              type: "group",
              description:
                "Please provide the information shown in the chart for each of the shareholders and include their ownership percentage",
              conditional: {
                field: "shareholderNatureMultiple",
                value: "Foreign Natural Person(s)",
              },
              fields: [
                {
                  name: "foreignNaturalPersonsList",
                  label: "Foreign natural persons list",
                  type: "array",
                  itemFields: [
                    {
                      name: "name",
                      label: "Full name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "passportNumber",
                      label: "Passport number",
                      type: "text",
                    },
                    {
                      name: "ownershipPercentage",
                      label: "Ownership percentage",
                      type: "number",
                      required: true,
                      styleType: "highlight",
                    },
                  ],
                },
              ],
            },
            {
              name: "multipleLocalLegalEntitiesDetails",
              label: "1.16 Shareholders - Local Legal Entity(ies)",
              type: "group",
              description:
                "Please provide the information shown in the chart for each of the shareholders and include their ownership percentage",
              conditional: {
                field: "shareholderNatureMultiple",
                value: "Local Legal Entity(ies)",
              },
              fields: [
                {
                  name: "localEntitiesList",
                  label: "Local legal entities list",
                  type: "array",
                  itemFields: [
                    {
                      name: "entityName",
                      label: "Entity name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "entityId",
                      label: "Entity ID",
                      type: "text",
                    },
                    {
                      name: "ownershipPercentage",
                      label: "Ownership percentage",
                      type: "number",
                      required: true,
                      styleType: "highlight",
                    },
                  ],
                },
              ],
            },
            {
              name: "multipleForeignLegalEntitiesDetails",
              label: "1.17 Shareholders - Foreign Legal Entity(ies)",
              type: "group",
              description:
                "Please provide the information shown in the chart for each of the shareholders and include their ownership percentage",
              conditional: {
                field: "shareholderNatureMultiple",
                value: "Foreign Legal Entity(ies)",
              },
              fields: [
                {
                  name: "foreignEntitiesList",
                  label: "Foreign legal entities list",
                  type: "array",
                  itemFields: [
                    {
                      name: "entityName",
                      label: "Entity name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "entityRegistration",
                      label: "Registration/ID",
                      type: "text",
                    },
                    {
                      name: "ownershipPercentage",
                      label: "Ownership percentage",
                      type: "number",
                      required: true,
                      styleType: "highlight",
                    },
                  ],
                },
              ],
            },
            {
              name: "multipleTrustsDetails",
              label: "1.18 Shareholders - Trust(s)",
              type: "group",
              description:
                "Please provide the information shown in the chart for each of the shareholders and include their ownership percentage",
              conditional: {
                field: "shareholderNatureMultiple",
                value: "Trust(s)",
              },
              fields: [
                {
                  name: "trustsList",
                  label: "Trusts list",
                  type: "array",
                  itemFields: [
                    {
                      name: "trustName",
                      label: "Trust name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "trustDetails",
                      label: "Trust details",
                      type: "textarea",
                    },
                    {
                      name: "ownershipPercentage",
                      label: "Ownership percentage",
                      type: "number",
                      required: true,
                      styleType: "highlight",
                    },
                  ],
                },
              ],
            },
            // --- SECCIÓN 1.19 Tipo de Entidad (S.A. / S.R.L.) ---
            {
              name: "entityType",
              label: "1.19 Type of entity",
              type: "radio",
              options: [
                "S.A. (Sociedad Anónima)",
                "S.R.L. (Sociedad de Responsabilidad Limitada)",
              ],
              required: true,
              description:
                "S.A.: Capital represented by shares, in any currency. Free transfer of shares. Managed by a Board of Directors (President, Secretary, Treasurer) and a Statutory Auditor. Must keep 3 legal books. Independent taxation; income taxed at the corporate level. Loans from shareholders are treated as commercial loans. S.R.L.: Capital represented by quotas (₡100 or multiples). Restricted transfer; partners have preferential rights. Managed by one or more Managers, simpler structure. Must keep 2 legal books. In many countries, treated as a pass-through entity, avoiding double taxation. Loans from partners may be treated as dividends and not deductible for tax purposes.",
              styleType: "section-header",
            },
            // --- Campos para S.R.L. (Sociedad de Responsabilidad Limitada) ---
            {
              name: "srlRepresentationNeed",
              label: "1.20 Representation for S.R.L.",
              type: "radio",
              options: [
                "I need the legal representation for one person",
                "I need the legal representation for more than one person",
              ],
              required: true,
              description:
                "How many legal representatives do you need? In Costa Rica, the Legal Representative is the individual officially authorized to act and sign on behalf of the company in all legal, administrative, and contractual matters. This person's powers are defined in the company's bylaws and allow them to legally bind the company before third parties and government authorities. Usually they are appointed as Managers or Assistant Managers of the entity.",
              conditional: {
                field: "entityType",
                value: "S.R.L. (Sociedad de Responsabilidad Limitada)",
              },
            },
            {
              name: "srlManagerPoaRestriction",
              label:
                "1.21 Would you like to restrict the legal representation of the Manager?",
              type: "radio",
              options: [
                "No, the Manager will have full POA without any restrictions",
                "Yes, I would like to restrict the POA of the Manager",
              ],
              required: true,
              description:
                "In Costa Rica, the Legal Representative is usually granted broad powers of attorney, allowing them to act on behalf of the company in and out of court, represent the company before any authority, and grant all types of powers of attorney. However, some companies choose to limit these powers, requiring prior approval from the quotaholders' meeting before the Legal Representative can dispose of company assets or incur debt on behalf of the company.",
              conditional: {
                field: "entityType",
                value: "S.R.L. (Sociedad de Responsabilidad Limitada)",
              },
            },
            {
              name: "srlManagerRestrictionsDetails",
              label: "1.22 What type of restrictions would the Manager have?",
              type: "textarea",
              conditional: {
                field: "srlManagerPoaRestriction",
                value: "Yes, I would like to restrict the POA of the Manager",
              },
            },
            {
              name: "srlManagersPoaGeneral",
              label:
                "1.23 Would you like to restrict the legal representation of the Managers or Assistant Managers?",
              type: "radio",
              options: [
                "No, the Managers will have full POA without any restrictions",
                "Yes, I would like to restrict the POA of the Managers",
                "Yes, I would like to restrict the POA of the Assistant Managers",
                "I'm not sure and would like to review this with my KAM",
              ],
              required: true,
              conditional: {
                field: "entityType",
                value: "S.R.L. (Sociedad de Responsabilidad Limitada)",
              },
            },
            {
              name: "srlManagersRestrictionsDetails",
              label: "1.24 What type of restrictions would the Managers have?",
              type: "textarea",
              conditional: {
                field: "srlManagersPoaGeneral",
                value: "Yes, I would like to restrict the POA of the Managers",
              },
            },
            {
              name: "srlAssistantManagersRestrictionsDetails",
              label:
                "1.25 What type of restrictions would the Assistant Managers have?",
              type: "textarea",
              conditional: {
                field: "srlManagersPoaGeneral",
                value:
                  "Yes, I would like to restrict the POA of the Assistant Managers",
              },
            },
            {
              name: "managersPersonalData",
              label: "1.26 Personal data of the Manager(s)",
              type: "group",
              description:
                "For each manager you wish to appoint, please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address",
              conditional: {
                field: "entityType",
                value: "S.R.L. (Sociedad de Responsabilidad Limitada)",
              },
              fields: [
                {
                  name: "managerList",
                  label: "Managers list",
                  type: "array",
                  itemFields: [
                    {
                      name: "fullName",
                      label: "Full name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "nationality",
                      label: "Nationality",
                      type: "text",
                    },
                    {
                      name: "occupation",
                      label: "Occupation",
                      type: "text",
                    },
                    {
                      name: "legalStatus",
                      label:
                        "Legal status (and number of nuptials if applicable)",
                      type: "text",
                    },
                    {
                      name: "idPassportNumber",
                      label:
                        "Valid ID/passport number with country of issuance",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "exactAddress",
                      label: "Exact address",
                      type: "textarea",
                    },
                  ],
                },
              ],
            },
            {
              name: "assistantManagersPersonalData",
              label: "1.27 Personal data of the Assistant Manager(s)",
              type: "group",
              description:
                "For each assistant manager please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address",
              conditional: {
                field: "entityType",
                value: "S.R.L. (Sociedad de Responsabilidad Limitada)",
              },
              fields: [
                {
                  name: "assistantManagerList",
                  label: "Assistant managers list",
                  type: "array",
                  itemFields: [
                    {
                      name: "fullName",
                      label: "Full name",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "nationality",
                      label: "Nationality",
                      type: "text",
                    },
                    {
                      name: "occupation",
                      label: "Occupation",
                      type: "text",
                    },
                    {
                      name: "legalStatus",
                      label:
                        "Legal status (and number of nuptials if applicable)",
                      type: "text",
                    },
                    {
                      name: "idPassportNumber",
                      label:
                        "Valid ID/passport number with country of issuance",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "exactAddress",
                      label: "Exact address",
                      type: "textarea",
                    },
                  ],
                },
              ],
            },
            // --- Campos para S.A. (Sociedad Anónima) ---
            {
              name: "saRepresentationNeed",
              label: "1.28 Representation for S.A.",
              type: "radio",
              options: [
                "I need the legal representation for the President only",
                "I need the legal representation for the whole Board of Directors (President - Secretary - Treasurer)",
                "Other",
              ],
              required: true,
              description:
                "How many legal representatives do you need? In Costa Rica, the Legal Representative is the individual officially authorized to act and sign on behalf of the company in all legal, administrative, and contractual matters. This person's powers are defined in the company's bylaws and allow them to legally bind the company before third parties and government authorities. By contrast, Directors are members of the Board who make collective management and policy decisions, but they do not automatically have legal representation. Only the person expressly appointed as Legal Representative (often the President) has the authority to execute and formalize those decisions on the company's behalf.",
              conditional: {
                field: "entityType",
                value: "S.A. (Sociedad Anónima)",
              },
            },
            {
              name: "saPresidentPoaRestriction",
              label:
                "1.29 Would you like to restrict the legal representation of the President?",
              type: "radio",
              options: [
                "No, the president will have full POA without any restrictions",
                "Yes, I would like to restrict the POA of the President",
              ],
              required: true,
              conditional: {
                field: "entityType",
                value: "S.A. (Sociedad Anónima)",
              },
            },
            {
              name: "saPresidentRestrictionDetails",
              label: "1.30 What type of restrictions would the President have?",
              type: "textarea",
              conditional: {
                field: "saPresidentPoaRestriction",
                value: "Yes, I would like to restrict the POA of the President",
              },
            },
            {
              name: "boardPoaOptions",
              label:
                "1.31 Would you like to restrict the legal representation of the Board?",
              type: "radio",
              options: [
                "No, the Board will have full POA without any restrictions and individual representation",
                "Yes, I would like the Board to have joint representation - always",
                "Yes, I would like the Board to have Mixed Representation on the terms described above",
                "Yes, I would like the Board to have another restriction",
                "I'm not sure and would like to review this with my KAM",
              ],
              required: true,
              description:
                "In Costa Rica, the Board of Directors may be collectively granted legal representation of the company. The authority can be structured in different ways: Individual representation; Joint (collective) representation: two or more directors must act together; Mixed representation: directors act individually for ordinary matters, but jointly for significant actions. A company's bylaws may limit the Board's powers, requiring prior authorization from the shareholders' meeting for certain acts.",
              conditional: {
                field: "entityType",
                value: "S.A. (Sociedad Anónima)",
              },
            },
            {
              name: "boardRestrictionsDetails",
              label: "1.32 What type of restrictions would the Board have?",
              type: "textarea",
              conditional: {
                field: "boardPoaOptions",
                value:
                  "Yes, I would like the Board to have another restriction",
              },
            },
            {
              name: "presidentPersonalData",
              label: "1.33 Personal data of the President",
              type: "group",
              description:
                "Please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address",
              fields: [
                {
                  name: "presidentFullName",
                  label: "Full name",
                  type: "text",
                  required: true,
                },
                {
                  name: "presidentNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "presidentOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "presidentLegalStatus",
                  label: "Legal status (and number of nuptials if applicable)",
                  type: "text",
                },
                {
                  name: "presidentIdPassport",
                  label: "Valid ID/passport number with country of issuance",
                  type: "text",
                  required: true,
                },
                {
                  name: "presidentAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            {
              name: "secretaryPersonalData",
              label: "1.34 Personal data of the Secretary",
              type: "group",
              description:
                "Please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address",
              fields: [
                {
                  name: "secretaryFullName",
                  label: "Full name",
                  type: "text",
                },
                {
                  name: "secretaryNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "secretaryOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "secretaryLegalStatus",
                  label: "Legal status (and number of nuptials if applicable)",
                  type: "text",
                },
                {
                  name: "secretaryIdPassport",
                  label: "Valid ID/passport number with country of issuance",
                  type: "text",
                },
                {
                  name: "secretaryAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            {
              name: "treasurerPersonalData",
              label: "1.35 Personal data of the Treasurer",
              type: "group",
              description:
                "Please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address",
              fields: [
                {
                  name: "treasurerFullName",
                  label: "Full name",
                  type: "text",
                },
                {
                  name: "treasurerNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "treasurerOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "treasurerLegalStatus",
                  label: "Legal status (and number of nuptials if applicable)",
                  type: "text",
                },
                {
                  name: "treasurerIdPassport",
                  label: "Valid ID/passport number with country of issuance",
                  type: "text",
                },
                {
                  name: "treasurerAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            {
              name: "fiscalOfficerPersonalData",
              label: "1.36 Personal data of the Fiscal Officer",
              type: "group",
              description:
                "The Fiscal is an oversight officer responsible for supervising the actions of the Board of Directors and management to ensure compliance with the law, the company's bylaws, and corporate governance principles. The Fiscal cannot be a member of the Board of Directors or hold any position of management or legal representation within the company. The Fiscal may not be related by blood or marriage to any of the directors. Please provide full name, nationality, occupation, legal status (and number of nuptials if applicable), valid ID/passport number with the country of issuance and exact address.",
              fields: [
                {
                  name: "fiscalFullName",
                  label: "Full name",
                  type: "text",
                  required: true,
                },
                {
                  name: "fiscalNationality",
                  label: "Nationality",
                  type: "text",
                },
                {
                  name: "fiscalOccupation",
                  label: "Occupation",
                  type: "text",
                },
                {
                  name: "fiscalLegalStatus",
                  label: "Legal status (and number of nuptials if applicable)",
                  type: "text",
                },
                {
                  name: "fiscalIdPassport",
                  label: "Valid ID/passport number with country of issuance",
                  type: "text",
                  required: true,
                },
                {
                  name: "fiscalAddress",
                  label: "Exact address",
                  type: "textarea",
                },
              ],
            },
            // NOTA: Faltarían los campos 1.33 y siguientes que estaban en tu JSON original
          ],
        },
        submittedForm: {},
      },
    ],
  },
];
