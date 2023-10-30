interface ActiveListProps {
    title: string,
    description: string | number | undefined,
}

export function ActiveList({title, description}:ActiveListProps) {
  return (
    <li className="flex gap-2 my-3 items-center">
      <div className="font-bold text-lg text-green-500">{title}</div>
      <div className="text-zinc-300">{description}</div>
    </li>
  );
}
