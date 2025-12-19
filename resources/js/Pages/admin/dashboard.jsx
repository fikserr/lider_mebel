import { AppSidebar } from '@/components/shared/app-sidebar';
import CountUp from '@/components/shared/countUp';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cards } from '@/components/shared/lists'

const lineChartData = [
  { name: 'Jan', sales: 2400 },
  { name: 'Feb', sales: 1398 },
  { name: 'Mar', sales: 9800 },
  { name: 'Apr', sales: 3908 },
  { name: 'May', sales: 4800 },
  { name: 'Jun', sales: 3800 },
  { name: 'Jul', sales: 4300 },
];

const AdminDashboard = () => {
  return (
    <div className="px-5">
      <AppSidebar />
      <h1 className="text-3xl font-bold mb-4 p-5">Dashboardd</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-5 border rounded-lg space-y-5 hover:shadow-md transition w-full"
          >
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">{card.title}</h2>

                  <CountUp
                    from={0}
                    to={card.value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-3xl font-bold"
                  />

                </div>
                <div
                  className={`flex justify-center items-center p-5 rounded-[40%] ${card.iconStyle}`}
                >
                  <img src={card.icon} alt={card.title} loading="lazy"/>
                </div>
              </div>
              <div className='flex items-center gap-2 text-lg'>
                <span className={`${card.chartColor}`}>{card.iconUp}</span>
                <span className={`${card.chartColor}`}>{card.diff}</span>
                <div className="text-md text-gray-500">{card.info}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4 px-5">Sales Overview</h2>
      <div className="w-full h-[300px] px-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
