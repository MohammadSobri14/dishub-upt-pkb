export default function SpinnerLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        <p className="text-gray-700 text-sm">Memuat data</p>
      </div>
    </div>
  );
}
