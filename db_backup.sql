--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ActionType; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."ActionType" AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE'
);


ALTER TYPE public."ActionType" OWNER TO myuser;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'SHIPPING',
    'DELIVERED',
    'CANCELED'
);


ALTER TYPE public."OrderStatus" OWNER TO myuser;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CASH',
    'CREDIT'
);


ALTER TYPE public."PaymentMethod" OWNER TO myuser;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);


ALTER TYPE public."PaymentStatus" OWNER TO myuser;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO myuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    "addressLine1" text NOT NULL,
    "addressLine2" text,
    "subDistrict" text NOT NULL,
    district text NOT NULL,
    province text NOT NULL,
    country text NOT NULL,
    "postalCode" text NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Address" OWNER TO myuser;

--
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Address_id_seq" OWNER TO myuser;

--
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- Name: Basket; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Basket" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    price double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public."Basket" OWNER TO myuser;

--
-- Name: Basket_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Basket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Basket_id_seq" OWNER TO myuser;

--
-- Name: Basket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Basket_id_seq" OWNED BY public."Basket".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    comment text NOT NULL,
    "sentimentScore" double precision,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Comment" OWNER TO myuser;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comment_id_seq" OWNER TO myuser;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: File; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."File" (
    id integer NOT NULL,
    filename text NOT NULL,
    mimetype text NOT NULL,
    encoding text NOT NULL,
    path text NOT NULL,
    size integer NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."File" OWNER TO myuser;

--
-- Name: File_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."File_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."File_id_seq" OWNER TO myuser;

--
-- Name: File_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."File_id_seq" OWNED BY public."File".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "totalPriceAmount" double precision NOT NULL,
    discount double precision NOT NULL,
    "deliveryFee" double precision NOT NULL,
    status public."OrderStatus" NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Order" OWNER TO myuser;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    subtotal double precision NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."OrderItem" OWNER TO myuser;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO myuser;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO myuser;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    amount double precision NOT NULL,
    method public."PaymentMethod" NOT NULL,
    status public."PaymentStatus" NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Payment" OWNER TO myuser;

--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO myuser;

--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text,
    description text,
    price double precision NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "fileId" integer,
    "filePath" text
);


ALTER TABLE public."Product" OWNER TO myuser;

--
-- Name: ProductDetail; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."ProductDetail" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "timeDelivery" text,
    "producedIn" text,
    brand text,
    "thcMin" double precision,
    "thcMax" double precision,
    "cbdMin" double precision,
    "cbdMax" double precision,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."ProductDetail" OWNER TO myuser;

--
-- Name: ProductDetail_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."ProductDetail_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductDetail_id_seq" OWNER TO myuser;

--
-- Name: ProductDetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."ProductDetail_id_seq" OWNED BY public."ProductDetail".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO myuser;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Stock; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Stock" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."Stock" OWNER TO myuser;

--
-- Name: Stock_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Stock_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Stock_id_seq" OWNER TO myuser;

--
-- Name: Stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Stock_id_seq" OWNED BY public."Stock".id;


--
-- Name: SysLog; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."SysLog" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "actionType" public."ActionType" NOT NULL,
    "tableAffected" text NOT NULL,
    "primaryKey" integer NOT NULL,
    details text NOT NULL,
    "timestamp" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SysLog" OWNER TO myuser;

--
-- Name: SysLog_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."SysLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SysLog_id_seq" OWNER TO myuser;

--
-- Name: SysLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."SysLog_id_seq" OWNED BY public."SysLog".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    birthdate timestamp(3) without time zone,
    email text NOT NULL,
    password text DEFAULT ''::text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    credit double precision DEFAULT 0 NOT NULL,
    "createdBy" integer,
    "updatedBy" integer,
    "deletedBy" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "fileId" integer,
    "filePath" text
);


ALTER TABLE public."User" OWNER TO myuser;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO myuser;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO myuser;

--
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- Name: Basket id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Basket" ALTER COLUMN id SET DEFAULT nextval('public."Basket_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: File id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."File" ALTER COLUMN id SET DEFAULT nextval('public."File_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductDetail id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProductDetail" ALTER COLUMN id SET DEFAULT nextval('public."ProductDetail_id_seq"'::regclass);


--
-- Name: Stock id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Stock" ALTER COLUMN id SET DEFAULT nextval('public."Stock_id_seq"'::regclass);


--
-- Name: SysLog id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SysLog" ALTER COLUMN id SET DEFAULT nextval('public."SysLog_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Address" (id, "userId", firstname, lastname, phone, email, "addressLine1", "addressLine2", "subDistrict", district, province, country, "postalCode", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Basket; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Basket" (id, "userId", "productId", quantity, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt", price) FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Comment" (id, "productId", comment, "sentimentScore", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."File" (id, filename, mimetype, encoding, path, size, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Order" (id, "userId", "totalPriceAmount", discount, "deliveryFee", status, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, subtotal, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Payment" (id, "orderId", amount, method, status, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Product" (id, name, description, price, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt", "fileId", "filePath") FROM stdin;
5	TANGERINE DREAM	This THC-dominant sativa is typically derived from G13 and Neville’s A5 Haze. The deep purple bud, has a strong citrusy aroma, and a unique terpene profile (myrcene, alpha-pinene, caryophyllene, beta-pinene, and linalool).	7.14	\N	\N	\N	2024-04-29 12:42:56.252	2024-04-29 12:43:39.773	\N	\N	public/img/gunja2.png
6	JEAN GUY	This medium-to-high THC flower is deep green, covered in trichomes and pack a citrusy punch. Good Supply's Jean Guy is a sativa-dominant strain and is greenhouse-grown.	3.21	\N	\N	\N	2024-04-29 12:45:23.844	2024-04-29 12:45:23.844	\N	\N	public/img/gunja3.png
7	ULTRA SOUR3	Ultra Sour by Big Bag O'Buds is a high-THC, sativa-dominant flower with orange pistils from deep green, crystal rich buds. With leading terpenes, terpinolene, limonene and caryophyllene, Ultra Sour has tart undertones and diesel, pungent notes with a sweet, fruit aroma. Available in 28g format.	3.57	\N	\N	\N	2024-04-29 12:52:45.156	2024-04-29 13:19:05.835	\N	\N	public/img/gunja6.png
8	ULTRA SOUR2	Ultra Sour by Big Bag O'Buds is a high-THC, sativa-dominant flower with orange pistils from deep green, crystal rich buds. With leading terpenes, terpinolene, limonene and caryophyllene, Ultra Sour has tart undertones and diesel, pungent notes with a sweet, fruit aroma. Available in 28g format.	3.57	\N	\N	\N	2024-04-29 12:52:50.855	2024-04-29 13:19:05.835	\N	\N	public/img/gunja5.png
9	ULTRA SOUR	Ultra Sour by Big Bag O'Buds is a high-THC, sativa-dominant flower with orange pistils from deep green, crystal rich buds. With leading terpenes, terpinolene, limonene and caryophyllene, Ultra Sour has tart undertones and diesel, pungent notes with a sweet, fruit aroma. Available in 28g format.	3.57	\N	\N	\N	2024-04-29 12:53:13.544	2024-04-29 13:19:05.835	\N	\N	public/img/gunja4.png
1	PINK KUSH NEW	Pure Sunfarms’ cut of Pink Kush from BC’s Vancouver Island	4.46	\N	\N	\N	2024-04-29 11:47:31.891	2024-04-29 17:26:04.623	\N	\N	public/img/gunja1.png
10	SOFTEN KUSH	SOFTENKUSH WORK HARD SMOKE HARDER	19.99	\N	\N	\N	2024-04-29 17:44:51.665	2024-04-29 17:44:51.665	\N	\N	public/img/gunja7.png
\.


--
-- Data for Name: ProductDetail; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."ProductDetail" (id, "productId", "timeDelivery", "producedIn", brand, "thcMin", "thcMax", "cbdMin", "cbdMax", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	1	1-2 days	British Columbia	Pure Sunfarms	210	270	0	0	\N	\N	\N	2024-04-29 11:47:31.891	2024-04-29 11:47:31.891	\N
5	5	1-2 days	Ontario	San Rafael '71	110	160	0	0	\N	\N	\N	2024-04-29 12:42:56.252	2024-04-29 12:42:56.252	\N
6	6	1-2 days	Ontario	Good Supply	240	300	0	0	\N	\N	\N	2024-04-29 12:45:23.844	2024-04-29 12:45:23.844	\N
7	7	1-2 days	New Brunswick	Big Bag O' Buds	230	290	0	0	\N	\N	\N	2024-04-29 12:52:45.156	2024-04-29 12:52:45.156	\N
8	8	1-2 days	New Brunswick	Big Bag O' Buds	230	290	0	0	\N	\N	\N	2024-04-29 12:52:50.855	2024-04-29 12:52:50.855	\N
9	9	1-2 days	New Brunswick	Big Bag O' Buds	230	290	0	0	\N	\N	\N	2024-04-29 12:53:13.544	2024-04-29 12:53:13.544	\N
10	10	2-3 days	BKK	SOFTEN	290	390	20	20	\N	\N	\N	2024-04-29 17:44:51.665	2024-04-29 17:44:51.665	\N
\.


--
-- Data for Name: Stock; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Stock" (id, "productId", quantity, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	1	30	\N	\N	\N	2024-04-29 11:47:31.891	2024-04-29 11:47:31.891	\N
5	5	1000	\N	\N	\N	2024-04-29 12:42:56.252	2024-04-29 12:42:56.252	\N
6	6	1000	\N	\N	\N	2024-04-29 12:45:23.844	2024-04-29 12:45:23.844	\N
7	7	500	\N	\N	\N	2024-04-29 12:52:45.156	2024-04-29 12:52:45.156	\N
8	8	500	\N	\N	\N	2024-04-29 12:52:50.855	2024-04-29 12:52:50.855	\N
9	9	500	\N	\N	\N	2024-04-29 12:53:13.544	2024-04-29 12:53:13.544	\N
10	10	999	\N	\N	\N	2024-04-29 17:44:51.665	2024-04-29 17:44:51.665	\N
\.


--
-- Data for Name: SysLog; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."SysLog" (id, "userId", "actionType", "tableAffected", "primaryKey", details, "timestamp") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."User" (id, birthdate, email, password, role, credit, "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "deletedAt", "fileId", "filePath") FROM stdin;
1	2024-04-29 12:35:50.141	james@gmail.com	123456789	USER	99.99	\N	\N	\N	2024-04-29 14:47:30.146	2024-04-29 18:42:10.495	\N	\N	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7b612e97-01dd-45e7-9e4d-ea35f0498f20	4bb5cae15f8a51850baf2568fbb5981c94154c7350d04f9bae684237756a4879	2024-04-29 11:43:18.348875+00	20240427223054_init	\N	\N	2024-04-29 11:43:18.315806+00	1
1050d9a8-45fa-40ff-ba69-5cddf634bf91	44f5aab0b3c6dc00334fe3a3c7337e98902ba3c9c990ab5e538b33e9bbf92686	2024-04-29 11:43:18.351616+00	20240427224703_init	\N	\N	2024-04-29 11:43:18.349444+00	1
d40404e1-26f7-4fa9-8522-9d71dfbe2ddb	e0808f65fcde063503a90e86e8921d571a961c40e3aecec35d272f54d8182e0f	2024-04-29 11:43:18.354284+00	20240429110410_edit_file_path	\N	\N	2024-04-29 11:43:18.352149+00	1
48b8b3a3-21cf-40b6-96c1-1481544ef531	072711a26142e0d3509d11777d1ddfc9c93f5405e448b68f0c351187def7f3ef	2024-04-29 13:55:41.089539+00	20240429133937_add_basket	\N	\N	2024-04-29 13:55:41.082792+00	1
1576ebdd-06aa-4ddd-85d1-8ebf43567bbf	4205b4d610f09c066fa71d3a506a315aa3d6a111b26dfdda42e47f60f7214661	2024-04-29 18:24:59.521266+00	20240429145949_add_price	\N	\N	2024-04-29 18:24:59.516982+00	1
07beb9cd-7f45-40af-891c-3b45dd2b1454	9981a8f1177026a8234c407a65acb42d8118304f403c0182d09b6d88aed0a7f1	2024-04-29 18:24:59.526572+00	20240429150016_add_default	\N	\N	2024-04-29 18:24:59.522864+00	1
\.


--
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Address_id_seq"', 1, false);


--
-- Name: Basket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Basket_id_seq"', 1, false);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: File_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."File_id_seq"', 1, false);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 1, false);


--
-- Name: ProductDetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."ProductDetail_id_seq"', 10, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Product_id_seq"', 10, true);


--
-- Name: Stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Stock_id_seq"', 10, true);


--
-- Name: SysLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."SysLog_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."User_id_seq"', 5, true);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Basket Basket_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Basket"
    ADD CONSTRAINT "Basket_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: File File_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: ProductDetail ProductDetail_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProductDetail"
    ADD CONSTRAINT "ProductDetail_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Stock Stock_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Stock"
    ADD CONSTRAINT "Stock_pkey" PRIMARY KEY (id);


--
-- Name: SysLog SysLog_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SysLog"
    ADD CONSTRAINT "SysLog_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Basket Basket_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Basket"
    ADD CONSTRAINT "Basket_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Basket Basket_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Basket"
    ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductDetail ProductDetail_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."ProductDetail"
    ADD CONSTRAINT "ProductDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_fileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Stock Stock_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Stock"
    ADD CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SysLog SysLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SysLog"
    ADD CONSTRAINT "SysLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_fileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

