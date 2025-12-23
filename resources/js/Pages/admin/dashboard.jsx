import { AppSidebar } from '@/components/shared/app-sidebar';
import CountUp from '@/components/shared/countUp';
import { Users, ShoppingCart, Sofa, BarChart3, TrendingDown, CircleDollarSign } from 'lucide-react';
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

  // Savdo mavjudligini tekshirish
  const hasSales = stats?.sales > 0;

  const cards = [
    {
      title: "A'zolar",
      value: stats?.users ?? 0,
      icon: Users,
      iconStyle: 'bg-gradient-to-br from-blue-400 to-blue-600',
      bgStyle: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-600',
    },
    {
      title: 'Buyurtmalar',
      value: stats?.orders ?? 0,
      icon: ShoppingCart,
      iconStyle: 'bg-gradient-to-br from-purple-400 to-purple-600',
      bgStyle: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-600',
    },
    {
      title: 'Tovarlar',
      value: stats?.products ?? 0,
      icon: Sofa,
      iconStyle: 'bg-gradient-to-br from-orange-400 to-orange-600',
      bgStyle: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-600',
    },
    {
      title: 'Sotuvlar',
      value: stats?.sales ?? 0,
      icon: CircleDollarSign,
      iconStyle: 'bg-gradient-to-br from-green-400 to-green-600',
      bgStyle: 'bg-green-50 border-green-200',
      textColor: 'text-green-600',
    },
  ];

  return (
    <div className="px-5 lg:w-[800px] xl:w-[1000px] 2xl:w-[1350px] min-h-screen pb-10">
      <AppSidebar />

      <h1 className="text-5xl font-bold mb-8 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full xl:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 border-2 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 ${card.bgStyle}`}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{card.title}</h2>
                <CountUp
                  from={0}
                  to={card.value}
                  separator=","
                  duration={1}
                  className={`text-4xl font-extrabold ${card.textColor}`}
                />
              </div>

              <div className={`p-4 rounded-xl ${card.iconStyle} shadow-lg`}>
                <card.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LineChart yoki Placeholder */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Sotuvlar Statistikasi</h2>
        </div>
        
        {hasSales ? (
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  dot={{ fill: '#4F46E5', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <TrendingDown className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Hali sotuvlar mavjud emas</h3>
            <p className="text-gray-500 text-center max-w-md">
              Birinchi sotuvlar amalga oshirilgandan so'ng bu yerda grafik ko'rsatiladi
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;