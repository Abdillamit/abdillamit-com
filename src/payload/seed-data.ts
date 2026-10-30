// Starting content for `npm run seed`: the four projects in three
// languages. Texts come from the resume; Kyrgyz needs proofreading.

type Locale = "ru" | "en" | "ky"

type LocalizedProject = {
  kind: string
  summary: string
  role: string
  period: string
  // Markdown, converted to rich text by the seed
  description: string
}

export type SeedProject = {
  slug: string
  title: string
  order: number
  stack: string[]
  links: { kind: "live" | "repo" | "docs" | "other"; url: string; label: string }[]
  content: Record<Locale, LocalizedProject>
}

export const seedProjects: SeedProject[] = [
  {
    slug: "finik",
    title: "finik.pay",
    order: 1,
    stack: ["React", "TypeScript", "Node.js", "GraphQL", "Redux", "RxJS", "AWS"],
    links: [{ kind: "live", url: "https://finik.kg", label: "finik.kg" }],
    content: {
      ru: {
        kind: "Финтех",
        summary:
          "Админка платёжной платформы: транзакции, аккаунты, права доступа и инкассация. Сайт документации Payments Gateway и Web SDK.",
        role: "Full-Stack Software Engineer",
        period: "с сентября 2024",
        description: `Платёжная платформа для бизнеса в Кыргызстане: мерчанты принимают оплату по QR-коду и через банковские приложения, а команда Finik управляет транзакциями, комиссиями и балансами в админке.

## Что я сделал

- **Админка.** Модули транзакций, аккаунтов, пользователей, Finik Items, прав доступа и инкассации. Таблицы с фильтрами, поиском, массовыми операциями, статистикой и RBAC.
- **Бэкенд.** Фильтрация комиссий по типу (фиксированная, процентная, динамическая шкала) в запросах к DynamoDB. Исправил расчёт начального и конечного баланса в статистике на OpenSearch.
- **Документация.** Сайт для Payments Gateway и Web SDK на трёх языках (RU, KY, EN) на Gatsby и MDX: диаграммы платёжных сценариев и интерактивные примеры кода.
- **Web SDK.** Помогал мерчантам подключать оплату через Finik Web SDK (QR-код и переход в банковское приложение) и консультировал их разработчиков.`,
      },
      en: {
        kind: "Fintech",
        summary:
          "Admin panel of a payment platform: transactions, accounts, access rights and cash collection. A documentation site for the Payments Gateway and Web SDK.",
        role: "Full-Stack Software Engineer",
        period: "since September 2024",
        description: `A payment platform for businesses in Kyrgyzstan: merchants take payments by QR code and through banking apps, and the Finik team manages transactions, fees and balances in the admin panel.

## What I did

- **Admin panel.** Modules for transactions, accounts, users, Finik Items, access rights and cash collection. Tables with filters, search, batch operations, statistics and RBAC.
- **Backend.** Commission filtering by fee type (flat, percentage, dynamic tiers) in DynamoDB queries. Fixed the opening and closing balance calculation in OpenSearch statistics.
- **Documentation.** A site for the Payments Gateway and Web SDK in three languages (RU, KY, EN) with Gatsby and MDX: sequence diagrams of payment flows and interactive code examples.
- **Web SDK.** Helped merchants connect payments through the Finik Web SDK (QR codes and bank-app deep links) and advised their developers on the technical side.`,
      },
      ky: {
        kind: "Финтех",
        summary:
          "Төлөм платформасынын админ-панели: транзакциялар, аккаунттар, кирүү укуктары жана инкассация. Payments Gateway жана Web SDK боюнча документация сайты.",
        role: "Full-Stack Software Engineer",
        period: "2024-жылдын сентябрынан бери",
        description: `Кыргызстандагы бизнес үчүн төлөм платформасы: мерчанттар төлөмдү QR-код жана банк тиркемелери аркылуу кабыл алышат, ал эми Finik командасы транзакцияларды, комиссияларды жана баланстарды админ-панелде башкарат.

## Эмне кылдым

- **Админ-панель.** Транзакциялар, аккаунттар, колдонуучулар, Finik Items, кирүү укуктары жана инкассация модулдары. Чыпкалары, издөөсү, топтук операциялары, статистикасы жана RBAC бар таблицалар.
- **Бэкенд.** DynamoDB'ге суроо-талаптарда комиссияларды түрү боюнча (туруктуу, пайыздык, динамикалык шкала) чыпкалоо. OpenSearch статистикасында баштапкы жана акыркы балансты эсептөөнү оңдодум.
- **Документация.** Payments Gateway жана Web SDK үчүн үч тилдеги (RU, KY, EN) сайт, Gatsby жана MDX менен: төлөм сценарийлеринин диаграммалары жана интерактивдүү код мисалдары.
- **Web SDK.** Мерчанттарга Finik Web SDK аркылуу төлөмдү туташтырууга жардам берип (QR-код жана банк тиркемесине өтүү), алардын иштеп чыгуучуларына кеңеш бердим.`,
      },
    },
  },
  {
    slug: "slonexpress",
    title: "SlonExpress",
    order: 2,
    stack: ["React", "Gatsby", "Node.js", "AWS Lambda", "Cognito", "S3"],
    links: [
      { kind: "live", url: "https://slonexpress.com", label: "slonexpress.com" },
    ],
    content: {
      ru: {
        kind: "Логистика",
        summary:
          "Международная логистика от MVP и дальше: пользователи, посылки, заказы и склады в нескольких странах.",
        role: "Full-Stack Software Engineer",
        period: "с сентября 2024",
        description: `Сервис международной доставки: веб-интерфейс для клиентов и панель управления заказами и складами.

## Что я сделал

- **Запуск продукта.** Довёл платформу до MVP и продолжил её развитие: frontend и backend на React, Node.js, AWS Lambda и API Gateway.
- **Админка.** Управление пользователями, посылками, заказами и складами: верификация аккаунтов, паспортные данные, адреса в нескольких странах.
- **Инфраструктура.** Исправил пропадание стилей в production-сборке (FOUC в Styletron), настроил Cache-Control для S3, CI/CD в CodePipeline и брендированное письмо верификации в Cognito.`,
      },
      en: {
        kind: "Logistics",
        summary:
          "International logistics from MVP onward: users, parcels, orders and warehouses in several countries.",
        role: "Full-Stack Software Engineer",
        period: "since September 2024",
        description: `An international delivery service: a web app for customers and a panel for managing orders and warehouses.

## What I did

- **Product launch.** Took the platform to MVP and kept developing it, building the frontend and backend with React, Node.js, AWS Lambda and API Gateway.
- **Admin panel.** Management of users, parcels, orders and warehouses: account verification, passport data, addresses in several countries.
- **Infrastructure.** Fixed missing styles in the production build (FOUC in Styletron); set up Cache-Control for S3, CI/CD in CodePipeline and a branded Cognito verification email.`,
      },
      ky: {
        kind: "Логистика",
        summary:
          "MVP'ден баштап эл аралык логистика: колдонуучулар, посылкалар, заказдар жана бир нече өлкөдөгү кампалар.",
        role: "Full-Stack Software Engineer",
        period: "2024-жылдын сентябрынан бери",
        description: `Эл аралык жеткирүү кызматы: кардарлар үчүн веб-интерфейс жана заказдар менен кампаларды башкаруу панели.

## Эмне кылдым

- **Продуктту ишке киргизүү.** Платформаны MVP'ге чейин жеткирип, андан ары өнүктүрдүм: frontend жана backend React, Node.js, AWS Lambda жана API Gateway менен.
- **Админ-панель.** Колдонуучуларды, посылкаларды, заказдарды жана кампаларды башкаруу: аккаунттарды текшерүү, паспорт маалыматтары, бир нече өлкөдөгү даректер.
- **Инфраструктура.** Production-сборкада стилдердин жоголушун оңдодум (Styletron'догу FOUC), S3 үчүн Cache-Control, CodePipeline'да CI/CD жана Cognito'до брендделген текшерүү катын жөндөдүм.`,
      },
    },
  },
  {
    slug: "umrahhajj",
    title: "umrahhajj",
    order: 3,
    stack: ["React", "TypeScript", "Apollo", "RxJS", "Styletron", "AWS AppSync"],
    links: [],
    content: {
      ru: {
        kind: "Хадж и умра",
        summary:
          "MVP примерно за три недели: заявки с фильтрами, экраны деталей и оплаты участников.",
        role: "Frontend",
        period: "",
        description: `Платформа для организации хаджа и умры: заявки паломников, участники и их оплаты.

## Что я сделал

- **Запуск MVP.** Выпустил MVP примерно за 3 недели, переписав компоненты Finik на Styletron.
- **Заявки и оплаты.** Раздел заявок (список с сортировкой и фильтрами, детальные экраны) и карточка оплат участников с прогрессом депозита на Apollo Client (cache-and-network) и RxJS-эпиках.
- **Команда.** Ввёл в проект нового frontend-разработчика и делал code review его PR.`,
      },
      en: {
        kind: "Hajj and Umrah",
        summary:
          "An MVP in about three weeks: applications with filters, detail screens and participant payments.",
        role: "Frontend",
        period: "",
        description: `A platform for organizing Hajj and Umrah: pilgrims' applications, participants and their payments.

## What I did

- **MVP launch.** Shipped the MVP in about 3 weeks by rewriting Finik components in Styletron.
- **Applications and payments.** The applications section (list with sorting and filters, detail screens) and a participant payment card with deposit progress, using Apollo Client (cache-and-network) and RxJS epics.
- **Team.** Onboarded a new frontend developer to the project and reviewed their pull requests.`,
      },
      ky: {
        kind: "Ажылык жана умра",
        summary:
          "Болжол менен үч жумада MVP: чыпкалары бар арыздар, деталдар экраны жана катышуучулардын төлөмдөрү.",
        role: "Frontend",
        period: "",
        description: `Ажылык жана умра сапарларын уюштуруу платформасы: зыяратчылардын арыздары, катышуучулар жана алардын төлөмдөрү.

## Эмне кылдым

- **MVP'ни чыгаруу.** Finik компоненттерин Styletron'го кайра жазып, MVP'ни болжол менен 3 жумада чыгардым.
- **Арыздар жана төлөмдөр.** Арыздар бөлүмү (сорттоо жана чыпкалары бар тизме, деталдуу экрандар) жана Apollo Client (cache-and-network) менен RxJS-эпиктердеги депозит прогресси бар катышуучулардын төлөм карточкасы.
- **Команда.** Долбоорго жаңы frontend-иштеп чыгуучуну киргизип, анын PR'ларына code review жасадым.`,
      },
    },
  },
  {
    slug: "mancho-school",
    title: "mancho.school",
    order: 4,
    stack: ["Gatsby", "TypeScript", "Apollo", "Redux", "AWS"],
    links: [
      {
        kind: "live",
        url: "https://www.mancho.dev/school/",
        label: "mancho.dev/school",
      },
    ],
    content: {
      ru: {
        kind: "Образование",
        summary:
          "Образовательная платформа ManchoDevs с курсами по Software Engineering. Здесь же я веду лекции и code review.",
        role: "Full-Stack, frontend-ментор",
        period: "с 2024",
        description: `Образовательная платформа ManchoDevs: курсы по Software Engineering. Я сам учился в Mancho School, а теперь работаю над платформой и преподаю frontend.

## Что я делаю

- **Платформа.** Разработка сайта школы на Gatsby, TypeScript, Apollo и Redux поверх AWS.
- **Менторство.** С сентября 2024 года обучил 20+ студентов frontend-разработке: лекции, воркшопы, code review, помощь с проектами.`,
      },
      en: {
        kind: "Education",
        summary:
          "The ManchoDevs education platform with Software Engineering courses. This is also where I give lectures and review code.",
        role: "Full-Stack, frontend mentor",
        period: "since 2024",
        description: `The ManchoDevs education platform: Software Engineering courses. I studied at Mancho School myself, and now I work on the platform and teach frontend.

## What I do

- **Platform.** Building the school's site with Gatsby, TypeScript, Apollo and Redux on AWS.
- **Mentoring.** Since September 2024 I have taught frontend development to 20+ students: lectures, workshops, code review, help with projects.`,
      },
      ky: {
        kind: "Билим берүү",
        summary:
          "Software Engineering боюнча курстары бар ManchoDevs'тин билим берүү платформасы. Ушул жерде лекция окуп, code review жасайм.",
        role: "Full-Stack, frontend-ментор",
        period: "2024-жылдан бери",
        description: `ManchoDevs'тин билим берүү платформасы: Software Engineering боюнча курстар. Мен өзүм Mancho School'до окугам, азыр платформанын үстүндө иштеп, frontend үйрөтөм.

## Эмне кылам

- **Платформа.** Мектептин сайтын Gatsby, TypeScript, Apollo жана Redux менен AWS'те иштеп чыгуу.
- **Менторлук.** 2024-жылдын сентябрынан бери 20дан ашык студентке frontend-иштеп чыгууну үйрөттүм: лекциялар, воркшоптор, code review, долбоорлор боюнча жардам.`,
      },
    },
  },
]
