// Starting content for `npm run seed`: the four products from the old
// Gatsby site and the resume, in three languages. Kyrgyz needs proofreading.

type Locale = "ru" | "en" | "ky"

type Item = { title: string; text: string }
type Layer = { title: string; sub: string }

type LocalizedProject = {
  kind: string
  tagline: string
  summary: string
  intro: string
  role: string
  period: string
  highlights: Item[]
  // Same order and length as `layerTags`
  layers: Layer[]
}

export type SeedProject = {
  slug: string
  title: string
  order: number
  tone: "amber" | "blue" | "sand" | "green"
  stack: string[]
  links: { kind: "live" | "repo" | "docs" | "other"; url: string; label: string }[]
  layerTags: string[]
  content: Record<Locale, LocalizedProject>
}

export const seedProjects: SeedProject[] = [
  {
    slug: "finik",
    title: "finik.pay",
    order: 1,
    tone: "amber",
    stack: ["React", "TypeScript", "Node.js", "GraphQL", "Redux", "RxJS", "AWS"],
    links: [{ kind: "live", url: "https://finik.kg", label: "finik.kg" }],
    layerTags: ["UI", "DOCS", "API", "DATA"],
    content: {
      ru: {
        kind: "Финтех",
        tagline: "Админка и документация платёжной платформы для бизнеса в Кыргызстане.",
        summary:
          "Админка платёжной платформы: транзакции, аккаунты, права доступа и инкассация. Сайт документации Payments Gateway и Web SDK.",
        intro:
          "Платёжная платформа: мерчанты принимают оплату по QR-коду и через банковские приложения, а команда Finik управляет транзакциями, комиссиями и балансами в админке.",
        role: "Full-Stack Software Engineer",
        period: "с сентября 2024",
        highlights: [
          {
            title: "Админка",
            text: "Модули транзакций, аккаунтов, пользователей, Finik Items, прав доступа и инкассации. Таблицы с фильтрами, поиском, массовыми операциями, статистикой и RBAC.",
          },
          {
            title: "Бэкенд",
            text: "Фильтрация комиссий по типу (фиксированная, процентная, динамическая шкала) в запросах к DynamoDB. Исправил расчёт начального и конечного баланса в статистике на OpenSearch.",
          },
          {
            title: "Документация",
            text: "Сайт для Payments Gateway и Web SDK на трёх языках (RU, KY, EN) на Gatsby и MDX: диаграммы платёжных сценариев и интерактивные примеры кода.",
          },
          {
            title: "Web SDK",
            text: "Помогал мерчантам подключать оплату через Finik Web SDK (QR-код и переход в банковское приложение) и консультировал их разработчиков.",
          },
        ],
        layers: [
          { title: "Админка", sub: "транзакции · аккаунты · RBAC" },
          { title: "Документация Gateway и Web SDK", sub: "Gatsby + MDX · RU / KY / EN" },
          { title: "GraphQL на Node.js", sub: "фильтры комиссий · статистика балансов" },
          { title: "DynamoDB и OpenSearch", sub: "AWS serverless" },
        ],
      },
      en: {
        kind: "Fintech",
        tagline: "Admin panel and docs for a payment platform for businesses in Kyrgyzstan.",
        summary:
          "Admin panel of a payment platform: transactions, accounts, access rights and cash collection. A documentation site for the Payments Gateway and Web SDK.",
        intro:
          "A payment platform: merchants take payments by QR code and through banking apps, and the Finik team manages transactions, fees and balances in the admin panel.",
        role: "Full-Stack Software Engineer",
        period: "since September 2024",
        highlights: [
          {
            title: "Admin panel",
            text: "Modules for transactions, accounts, users, Finik Items, access rights and cash collection. Tables with filters, search, batch operations, statistics and RBAC.",
          },
          {
            title: "Backend",
            text: "Commission filtering by fee type (flat, percentage, dynamic tiers) in DynamoDB queries. Fixed the opening and closing balance calculation in OpenSearch statistics.",
          },
          {
            title: "Documentation",
            text: "A site for the Payments Gateway and Web SDK in three languages (RU, KY, EN) with Gatsby and MDX: sequence diagrams of payment flows and interactive code examples.",
          },
          {
            title: "Web SDK",
            text: "Helped merchants connect payments through the Finik Web SDK (QR codes and bank-app deep links) and advised their developers on the technical side.",
          },
        ],
        layers: [
          { title: "Admin panel", sub: "transactions · accounts · RBAC" },
          { title: "Gateway and Web SDK docs", sub: "Gatsby + MDX · RU / KY / EN" },
          { title: "GraphQL on Node.js", sub: "fee filters · balance statistics" },
          { title: "DynamoDB and OpenSearch", sub: "AWS serverless" },
        ],
      },
      ky: {
        kind: "Финтех",
        tagline: "Кыргызстандагы бизнес үчүн төлөм платформасынын админ-панели жана документациясы.",
        summary:
          "Төлөм платформасынын админ-панели: транзакциялар, аккаунттар, кирүү укуктары жана инкассация. Payments Gateway жана Web SDK боюнча документация сайты.",
        intro:
          "Төлөм платформасы: мерчанттар төлөмдү QR-код жана банк тиркемелери аркылуу кабыл алышат, ал эми Finik командасы транзакцияларды, комиссияларды жана баланстарды админ-панелде башкарат.",
        role: "Full-Stack Software Engineer",
        period: "2024-жылдын сентябрынан бери",
        highlights: [
          {
            title: "Админ-панель",
            text: "Транзакциялар, аккаунттар, колдонуучулар, Finik Items, кирүү укуктары жана инкассация модулдары. Чыпкалары, издөөсү, топтук операциялары, статистикасы жана RBAC бар таблицалар.",
          },
          {
            title: "Бэкенд",
            text: "DynamoDB'ге суроо-талаптарда комиссияларды түрү боюнча (туруктуу, пайыздык, динамикалык шкала) чыпкалоо. OpenSearch статистикасында баштапкы жана акыркы балансты эсептөөнү оңдодум.",
          },
          {
            title: "Документация",
            text: "Payments Gateway жана Web SDK үчүн үч тилдеги (RU, KY, EN) сайт, Gatsby жана MDX менен: төлөм сценарийлеринин диаграммалары жана интерактивдүү код мисалдары.",
          },
          {
            title: "Web SDK",
            text: "Мерчанттарга Finik Web SDK аркылуу төлөмдү туташтырууга жардам берип (QR-код жана банк тиркемесине өтүү), алардын иштеп чыгуучуларына кеңеш бердим.",
          },
        ],
        layers: [
          { title: "Админ-панель", sub: "транзакциялар · аккаунттар · RBAC" },
          { title: "Gateway жана Web SDK документациясы", sub: "Gatsby + MDX · RU / KY / EN" },
          { title: "Node.js'теги GraphQL", sub: "комиссия чыпкалары · баланс статистикасы" },
          { title: "DynamoDB жана OpenSearch", sub: "AWS serverless" },
        ],
      },
    },
  },
  {
    slug: "slonexpress",
    title: "SlonExpress",
    order: 2,
    tone: "blue",
    stack: ["React", "Gatsby", "Node.js", "AWS Lambda", "Cognito", "S3"],
    links: [
      { kind: "live", url: "https://slonexpress.com", label: "slonexpress.com" },
    ],
    layerTags: ["UI", "AUTH", "API", "OPS"],
    content: {
      ru: {
        kind: "Логистика",
        tagline: "Логистическая платформа: от MVP и дальше.",
        summary:
          "Международная логистика от MVP и дальше: пользователи, посылки, заказы и склады в нескольких странах.",
        intro:
          "Сервис международной доставки: веб-интерфейс для клиентов и панель, где команда управляет посылками, заказами и складами в нескольких странах.",
        role: "Full-Stack Software Engineer",
        period: "с сентября 2024",
        highlights: [
          {
            title: "Запуск продукта",
            text: "Довёл платформу до MVP и продолжил её развитие: frontend и backend на React, Node.js, AWS Lambda и API Gateway.",
          },
          {
            title: "Админка",
            text: "Управление пользователями, посылками, заказами и складами: верификация аккаунтов, паспортные данные, адреса в нескольких странах.",
          },
          {
            title: "Инфраструктура",
            text: "Исправил пропадание стилей в production-сборке (FOUC в Styletron), настроил Cache-Control для S3 и CI/CD в CodePipeline.",
          },
          {
            title: "Авторизация",
            text: "Брендированное письмо верификации в Cognito.",
          },
        ],
        layers: [
          { title: "Админка на Gatsby и React", sub: "пользователи · посылки · заказы · склады" },
          { title: "Cognito", sub: "верификация · брендированное письмо" },
          { title: "Node.js на Lambda", sub: "API Gateway" },
          { title: "S3 и CodePipeline", sub: "Cache-Control · CI/CD" },
        ],
      },
      en: {
        kind: "Logistics",
        tagline: "A logistics platform, from MVP onward.",
        summary:
          "International logistics from MVP onward: users, parcels, orders and warehouses in several countries.",
        intro:
          "An international delivery service: a web app for customers and a panel where the team manages parcels, orders and warehouses in several countries.",
        role: "Full-Stack Software Engineer",
        period: "since September 2024",
        highlights: [
          {
            title: "Product launch",
            text: "Took the platform to MVP and kept developing it, building the frontend and backend with React, Node.js, AWS Lambda and API Gateway.",
          },
          {
            title: "Admin panel",
            text: "Management of users, parcels, orders and warehouses: account verification, passport data, addresses in several countries.",
          },
          {
            title: "Infrastructure",
            text: "Fixed missing styles in the production build (FOUC in Styletron); set up Cache-Control for S3 and CI/CD in CodePipeline.",
          },
          {
            title: "Auth",
            text: "A branded Cognito verification email.",
          },
        ],
        layers: [
          { title: "Gatsby and React admin", sub: "users · parcels · orders · warehouses" },
          { title: "Cognito", sub: "verification · branded email" },
          { title: "Node.js on Lambda", sub: "API Gateway" },
          { title: "S3 and CodePipeline", sub: "Cache-Control · CI/CD" },
        ],
      },
      ky: {
        kind: "Логистика",
        tagline: "Логистика платформасы: MVP'ден ары карай.",
        summary:
          "MVP'ден баштап эл аралык логистика: колдонуучулар, посылкалар, заказдар жана бир нече өлкөдөгү кампалар.",
        intro:
          "Эл аралык жеткирүү кызматы: кардарлар үчүн веб-интерфейс жана команда бир нече өлкөдөгү посылкаларды, заказдарды жана кампаларды башкарган панель.",
        role: "Full-Stack Software Engineer",
        period: "2024-жылдын сентябрынан бери",
        highlights: [
          {
            title: "Продуктту ишке киргизүү",
            text: "Платформаны MVP'ге чейин жеткирип, андан ары өнүктүрдүм: frontend жана backend React, Node.js, AWS Lambda жана API Gateway менен.",
          },
          {
            title: "Админ-панель",
            text: "Колдонуучуларды, посылкаларды, заказдарды жана кампаларды башкаруу: аккаунттарды текшерүү, паспорт маалыматтары, бир нече өлкөдөгү даректер.",
          },
          {
            title: "Инфраструктура",
            text: "Production-сборкада стилдердин жоголушун оңдодум (Styletron'догу FOUC), S3 үчүн Cache-Control жана CodePipeline'да CI/CD жөндөдүм.",
          },
          {
            title: "Авторизация",
            text: "Cognito'до брендделген текшерүү каты.",
          },
        ],
        layers: [
          { title: "Gatsby жана React'теги админ-панель", sub: "колдонуучулар · посылкалар · заказдар · кампалар" },
          { title: "Cognito", sub: "текшерүү · брендделген кат" },
          { title: "Lambda'дагы Node.js", sub: "API Gateway" },
          { title: "S3 жана CodePipeline", sub: "Cache-Control · CI/CD" },
        ],
      },
    },
  },
  {
    slug: "umrahhajj",
    title: "umrahhajj",
    order: 3,
    tone: "sand",
    stack: ["React", "TypeScript", "Apollo", "RxJS", "Styletron", "AWS AppSync"],
    links: [],
    layerTags: ["UI", "STATE", "API", "SHIP"],
    content: {
      ru: {
        kind: "Хадж и умра",
        tagline: "MVP примерно за три недели.",
        summary:
          "MVP примерно за три недели: заявки с фильтрами, экраны деталей и оплаты участников.",
        intro:
          "Платформа для организации хаджа и умры: заявки паломников, участники и их оплаты. Чтобы запуститься быстро, я переписал компоненты Finik на Styletron.",
        role: "Frontend",
        period: "",
        highlights: [
          {
            title: "Запуск MVP",
            text: "Выпустил MVP примерно за 3 недели, переписав компоненты Finik на Styletron.",
          },
          {
            title: "Заявки и оплаты",
            text: "Раздел заявок (список с сортировкой и фильтрами, детальные экраны) и карточка оплат участников с прогрессом депозита на Apollo Client (cache-and-network) и RxJS-эпиках.",
          },
          {
            title: "Команда",
            text: "Ввёл в проект нового frontend-разработчика и делал code review его PR.",
          },
        ],
        layers: [
          { title: "Заявки и экраны деталей", sub: "сортировка · фильтры" },
          { title: "RxJS-эпики", sub: "Apollo cache-and-network" },
          { title: "AWS AppSync", sub: "GraphQL" },
          { title: "MVP примерно за 3 недели", sub: "компоненты Finik на Styletron" },
        ],
      },
      en: {
        kind: "Hajj and Umrah",
        tagline: "An MVP shipped in about three weeks.",
        summary:
          "An MVP in about three weeks: applications with filters, detail screens and participant payments.",
        intro:
          "A platform for organizing Hajj and Umrah: pilgrims' applications, participants and their payments. To launch fast, I rewrote Finik components in Styletron.",
        role: "Frontend",
        period: "",
        highlights: [
          {
            title: "MVP launch",
            text: "Shipped the MVP in about 3 weeks by rewriting Finik components in Styletron.",
          },
          {
            title: "Applications and payments",
            text: "The applications section (list with sorting and filters, detail screens) and a participant payment card with deposit progress, using Apollo Client (cache-and-network) and RxJS epics.",
          },
          {
            title: "Team",
            text: "Onboarded a new frontend developer to the project and reviewed their pull requests.",
          },
        ],
        layers: [
          { title: "Applications and detail screens", sub: "sorting · filters" },
          { title: "RxJS epics", sub: "Apollo cache-and-network" },
          { title: "AWS AppSync", sub: "GraphQL" },
          { title: "MVP in about 3 weeks", sub: "Finik components in Styletron" },
        ],
      },
      ky: {
        kind: "Ажылык жана умра",
        tagline: "Болжол менен үч жумада чыккан MVP.",
        summary:
          "Болжол менен үч жумада MVP: чыпкалары бар арыздар, деталдар экраны жана катышуучулардын төлөмдөрү.",
        intro:
          "Ажылык жана умра сапарларын уюштуруу платформасы: зыяратчылардын арыздары, катышуучулар жана алардын төлөмдөрү. Тез ишке киргизүү үчүн Finik компоненттерин Styletron'го кайра жаздым.",
        role: "Frontend",
        period: "",
        highlights: [
          {
            title: "MVP'ни чыгаруу",
            text: "Finik компоненттерин Styletron'го кайра жазып, MVP'ни болжол менен 3 жумада чыгардым.",
          },
          {
            title: "Арыздар жана төлөмдөр",
            text: "Арыздар бөлүмү (сорттоо жана чыпкалары бар тизме, деталдуу экрандар) жана Apollo Client (cache-and-network) менен RxJS-эпиктердеги депозит прогресси бар катышуучулардын төлөм карточкасы.",
          },
          {
            title: "Команда",
            text: "Долбоорго жаңы frontend-иштеп чыгуучуну киргизип, анын PR'ларына code review жасадым.",
          },
        ],
        layers: [
          { title: "Арыздар жана деталдар экраны", sub: "сорттоо · чыпкалар" },
          { title: "RxJS-эпиктер", sub: "Apollo cache-and-network" },
          { title: "AWS AppSync", sub: "GraphQL" },
          { title: "Болжол менен 3 жумада MVP", sub: "Styletron'догу Finik компоненттери" },
        ],
      },
    },
  },
  {
    slug: "mancho-school",
    title: "mancho.school",
    order: 4,
    tone: "green",
    stack: ["Gatsby", "TypeScript", "Apollo", "Redux", "AWS"],
    links: [
      {
        kind: "live",
        url: "https://www.mancho.dev/school/",
        label: "mancho.dev/school",
      },
    ],
    layerTags: ["LEARN", "TEACH", "REVIEW", "NOW"],
    content: {
      ru: {
        kind: "Образование",
        tagline: "Учу frontend 20+ студентов в школе, где сам учился.",
        summary:
          "Образовательная платформа ManchoDevs с курсами по Software Engineering. Здесь же я веду лекции и code review.",
        intro:
          "Образовательная платформа ManchoDevs: курсы по Software Engineering. Я сам учился в Mancho School, а теперь работаю над платформой и преподаю frontend.",
        role: "Full-Stack, frontend-ментор",
        period: "с 2024",
        highlights: [
          {
            title: "Платформа",
            text: "Разработка сайта школы на Gatsby, TypeScript, Apollo и Redux поверх AWS.",
          },
          {
            title: "Лекции и воркшопы",
            text: "С сентября 2024 года обучил 20+ студентов frontend-разработке.",
          },
          {
            title: "Code review",
            text: "Разбираю проекты студентов и помогаю, когда они застревают.",
          },
        ],
        layers: [
          { title: "Студент, 2023", sub: "программа Software Engineering" },
          { title: "Лекции и воркшопы", sub: "frontend" },
          { title: "Code review", sub: "проекты студентов" },
          { title: "20+ студентов", sub: "ментор с 2024 года" },
        ],
      },
      en: {
        kind: "Education",
        tagline: "Teaching frontend to 20+ students at the school where I studied.",
        summary:
          "The ManchoDevs education platform with Software Engineering courses. This is also where I give lectures and review code.",
        intro:
          "The ManchoDevs education platform: Software Engineering courses. I studied at Mancho School myself, and now I work on the platform and teach frontend.",
        role: "Full-Stack, frontend mentor",
        period: "since 2024",
        highlights: [
          {
            title: "Platform",
            text: "Building the school's site with Gatsby, TypeScript, Apollo and Redux on AWS.",
          },
          {
            title: "Lectures and workshops",
            text: "Since September 2024 I have taught frontend development to 20+ students.",
          },
          {
            title: "Code review",
            text: "Feedback on student projects and help when they get stuck.",
          },
        ],
        layers: [
          { title: "Student, 2023", sub: "Software Engineering program" },
          { title: "Lectures and workshops", sub: "frontend" },
          { title: "Code review", sub: "student projects" },
          { title: "20+ students", sub: "mentor since 2024" },
        ],
      },
      ky: {
        kind: "Билим берүү",
        tagline: "Өзүм окуган мектепте 20дан ашык студентке frontend үйрөтөм.",
        summary:
          "Software Engineering боюнча курстары бар ManchoDevs'тин билим берүү платформасы. Ушул жерде лекция окуп, code review жасайм.",
        intro:
          "ManchoDevs'тин билим берүү платформасы: Software Engineering боюнча курстар. Мен өзүм Mancho School'до окугам, азыр платформанын үстүндө иштеп, frontend үйрөтөм.",
        role: "Full-Stack, frontend-ментор",
        period: "2024-жылдан бери",
        highlights: [
          {
            title: "Платформа",
            text: "Мектептин сайтын Gatsby, TypeScript, Apollo жана Redux менен AWS'те иштеп чыгуу.",
          },
          {
            title: "Лекциялар жана воркшоптор",
            text: "2024-жылдын сентябрынан бери 20дан ашык студентке frontend-иштеп чыгууну үйрөттүм.",
          },
          {
            title: "Code review",
            text: "Студенттердин долбоорлорун карап чыгып, кыйналганда жардам берем.",
          },
        ],
        layers: [
          { title: "Студент, 2023", sub: "Software Engineering программасы" },
          { title: "Лекциялар жана воркшоптор", sub: "frontend" },
          { title: "Code review", sub: "студенттердин долбоорлору" },
          { title: "20дан ашык студент", sub: "2024-жылдан бери ментор" },
        ],
      },
    },
  },
]
