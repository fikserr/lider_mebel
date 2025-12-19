import Watch from '@images/appleWatch.svg'
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { ImStarEmpty } from "react-icons/im";
import Group from '@images/groupIcon.svg';
import Order from '@images/orderIcon.svg';
import Sales from '@images/salesIcon.svg';
import Pending from '@images/pendingIcon.svg';

export const favoriteProducts = [
    {
        id: 1,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch,
    },
    {
        id: 2,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 3,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 4,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 5,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 6,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 7,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 8,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
];

export const products = [
    {
        id: 1,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch,
    },
    {
        id: 2,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
    {
        id: 3,
        title: "Apple Watch Series 4",
        price: 120,
        rating: 4.5,
        reviews: 131,
        image: Watch
    },
];

export const orders = [
    { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric", status: "Completed" },
    { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book", status: "Processing" },
    { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine", status: "Rejected" },
    { id: "00004", name: "Gilbert Johnston", address: "768 Destiny Lake Suite 600", date: "05 Feb 2019", type: "Mobile", status: "Completed" },
    { id: "00005", name: "Alan Cain", address: "042 Mylene Throughway", date: "29 Jul 2019", type: "Watch", status: "Processing" },
    { id: "00006", name: "Alfred Murray", address: "543 Weinman Mountain", date: "15 Aug 2019", type: "Medicine", status: "Completed" },
    { id: "00007", name: "Maggie Sullivan", address: "New Scottieberg", date: "21 Dec 2019", type: "Watch", status: "Processing" },
    { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine", status: "On Hold" },
    { id: "00009", name: "Dollie Hines", address: "124 Lyla Forge Suite 975", date: "09 Jan 2019", type: "Book", status: "In Transit" },
];

export const productStock = [
    {
        image: Watch,
        name: "Apple Watch Series 4",
        category: "Digital Product",
        price: "$690.00",
        piece: 63,
        colors: ["#000000", "#F87171", "#D1D5DB"]
    },
    {
        image: Watch,
        name: "Microsoft Headsquare",
        category: "Digital Product",
        price: "$190.00",
        piece: 13,
        colors: ["#000000", "#3B82F6", "#FBBF24"]
    },
    {
        image: Watch,
        name: "Women's Dress",
        category: "Fashion",
        price: "$640.00",
        piece: 635,
        colors: ["#7C3AED", "#60A5FA", "#4338CA"]
    },
    {
        image: Watch,
        name: "Samsung A50",
        category: "Mobile",
        price: "$400.00",
        piece: 67,
        colors: ["#1E3A8A", "#6B21A8", "#B91C1C"]
    },
    {
        image: Watch,
        name: "Camera",
        category: "Electronic",
        price: "$420.00",
        piece: 52,
        colors: ["#1E3A8A", "#000000", "#B91C1C"]
    }
];

export const homeCard = [
    { id: 1, title: "Product nomi", price: "Product narxi" },
    { id: 2, title: "Product nomi", price: "Product narxi" },
    { id: 3, title: "Product nomi", price: "Product narxi" },
    { id: 4, title: "Product nomi", price: "Product narxi" },
    { id: 5, title: "Product nomi", price: "Product narxi" },
    { id: 6, title: "Product nomi", price: "Product narxi" },
    { id: 7, title: "Product nomi", price: "Product narxi" },
    { id: 8, title: "Product nomi", price: "Product narxi" },
    { id: 9, title: "Product nomi", price: "Product narxi" },
    { id: 10, title: "Product nomi", price: "Product narxi" },
    { id: 11, title: "Product nomi", price: "Product narxi" },
    { id: 12, title: "Product nomi", price: "Product narxi" },
];

export const cards = [
    {
        title: "Total Users",
        value: 40689,
        diff: "8.5%",
        icon: Group,
        iconUp: <IoMdTrendingUp />,
        iconStyle: "bg-[rgb(228,228,255)]",
        info: "Up from yesterday",
        isCurrency: false,
        chartColor: "text-green-500",
    },
    {
        title: "Total Order",
        value: 10293,
        diff: "1.3%",
        icon: Order,
        iconUp: <IoMdTrendingUp />,
        iconStyle: "bg-[rgb(254,242,214)]",
        info: "Up from last week",
        isCurrency: false,
        chartColor: "text-green-500",
    },
    {
        title: "Total Sales",
        value: 89000,
        diff: "4.3%",
        icon: Sales,
        iconUp: <IoMdTrendingDown />,
        iconStyle: "bg-[rgb(217,247,231)]",
        info: "Down from yesterday",
        isCurrency: true,
        chartColor: "text-red-500",
    },
    {
        title: "Total Products",
        value: 2040,
        diff: "1.8%",
        icon: Pending,
        iconUp: <IoMdTrendingUp />,
        iconStyle: "bg-[rgb(255,222,210)]",
        info: "Up from yesterday",
        isCurrency: false,
        chartColor: "text-green-500",
    },
];

export const shoes = [
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
    { title: "Product nomi", price: "Product narxi", star: <ImStarEmpty /> },
]