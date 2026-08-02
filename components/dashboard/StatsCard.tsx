type Props = {
  title: string;
  value: string;
  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6">
      <h3 className="text-gray-500 text-sm uppercase">
        {title}
      </h3>

      <p className={`text-5xl font-bold mt-4 ${color}`}>
        {value}
      </p>
    </div>
  );
}