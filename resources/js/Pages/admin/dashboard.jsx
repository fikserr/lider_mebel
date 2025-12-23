import { AppSidebar } from '@/components/shared/app-sidebar';
import CountUp from '@/components/shared/countUp';
import Group from '@images/groupIcon.svg';
import Order from '@images/orderIcon.svg';
import Sales from '@images/salesIcon.svg';
import Pending from '@images/pendingIcon.svg';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePage } from '@inertiajs/react';

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const AdminDashboard = () => {
  const { stats } = usePage().props;
  console.log(stats.users, stats.orders, stats.products, stats.sales, stats.monthlySales);
  const lineChartData = stats.monthlySales.map(item => ({
    name: monthNames[item.month - 1],
    sales: item.total,
  }));
  const cards = [
    {
      title: 'Foydalanuvchilar',
      value: stats?.users ?? 0,
      icon: Group,
      iconStyle: 'bg-blue-100',
      chartColor: 'text-green-500',
    },
    {
      title: 'Buyurtmalar',
      value: stats?.orders ?? 0,
      icon: Order,
      iconStyle: 'bg-purple-100',
      chartColor: 'text-green-500',
    },
    {
      title: 'Tovarlar',
      value: stats?.products ?? 0,
      icon: Pending,
      iconStyle: 'bg-orange-100',
      chartColor: 'text-red-500',
    },
    {
      title: 'Sotuvlar',
      value: stats?.sales ?? 0,
      icon: Sales,
      iconStyle: 'bg-green-100',
      chartColor: 'text-green-500',
    },
  ];

  return (
    <div className="px-5 lg:w-[800px] xl:w-[1000px] 2xl:w-[1350px] h-[700px] flex flex-col justify-between">
      <AppSidebar />

      <h1 className="text-6xl font-bold mb-4 p-5">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full xl:grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg space-y-2 hover:shadow-md transition w-full py-5"
          >
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">{card.title}</h2>

                  <CountUp
                    from={0}
                    to={card.value}
                    separator=","
                    duration={1}
                    className="text-3xl font-bold"
                  />
                </div>

                <div className={`p-5 rounded-[40%] ${card.iconStyle}`}>
                  <img src={card.icon} alt={card.title} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 px-5">Sotuvlar Jadvali</h2>
      <div className="w-full 2xl:w-[1350px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
