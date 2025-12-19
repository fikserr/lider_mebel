import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';
import { HiOutlineSearch } from 'react-icons/hi';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';

const AddProductForm = ({ users, search: initialSearch }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState(initialSearch || '');
  const { toast } = useToast();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // Laravel route bilan sozlanishi kerak: route('admin.users')
    router.get('/admin-users', { search: value }, { preserveState: true });
  };

  const toggleAdmin = async (user) => {
    setLoadingId(user.id);
    try {
      await router.put(
        (`/admin/users/${user.id}`),
        { is_admin: !user.is_admin },
        {
          preserveScroll: true,
          onSuccess: () => {
            toast({
              title: "Muvaffaqiyatli",
              description: !user.is_admin
                ? `${user.name} adminga tayyorlandi`
                : `${user.name} dan adminlik olib tashlandi`,
            });
          },
          onFinish: () => setLoadingId(null),
        }
      );
    } catch (err) {
      console.error(err);
      setLoadingId(null);
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos, keyinroq urinib ko‘ring",
      });
    }
  };
  
  return (
    <div className="p-6 mx-5 min-h-screen w-[1200px]">
      <h1 className="text-3xl font-bold mb-6">User Lists</h1>
      <div className="mb-4 flex items-center border max-w-sm rounded-lg px-3">
        <input
          placeholder="Ism yoki email bilan izlash..."
          value={search}
          onChange={handleSearchChange}
          className="w-full border-none outline-none p-1"
        />
        <HiOutlineSearch style={{fontSize: "22px"}}/>
      </div>
      <div className="">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 font-medium">Id</th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Created</th>
              <th className="px-4 py-2 font-medium">Role</th>
              <th className="px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {new Date(user.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">{user.is_admin ? "Admin" : "User"}</td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={user.is_admin}
                      onChange={() => toggleAdmin(user)}
                      disabled={loadingId === user.id}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition duration-300 ease-in-out group-hover:scale-105"></div>
                    <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all duration-300 ease-in-out peer-checked:translate-x-5 peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.total > 0 && (
          <Pagination className="mt-5">
            <PaginationContent>
              {users.links.map((item, i) => (
                <PaginationItem key={i}>
                  {item.url ? (
                    <Link
                      href={item.url}
                      className={`px-3 py-1 rounded hover:bg-gray-200 ${item.active ? "bg-gray-300 font-bold" : ""}`}
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  ) : (
                    <span
                      className="px-3 py-1 text-gray-400"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  )}
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
