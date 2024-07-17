import { Cover } from '../cover/Cover'
import { Movie } from '@/types/movie'

type CategoryProps = {
  title: string
  list: Movie[]
  type: 'tv' | 'movie'
}

export function Category({ title, list, type }: CategoryProps) {
  return (
    <section className="sticky">
      <p className="text-xl font-bold text-zinc-50">{title}</p>
      <div className="mt-6 flex gap-8 overflow-hidden">
        {list.map((item) => (
          <Cover key={item.id} item={item} type={type} />
        ))}
      </div>
    </section>
  )
}
