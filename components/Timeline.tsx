import { cosmereEvents } from '@/data/events'

const Timeline = () => {
  return (
    <div className="flex flex-col gap-6 py-8">
      {cosmereEvents
        .sort((a, b) => {
          if (a.date >= b.date) return 1
          return -1
        })
        .map(({ id, title, date, location, description }) => (
          <div key={id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className='text-sm text-zinc-400'>
              {date} · {location}
            </p>
            <p className='text-base mt-2'>{description}</p>
          </div>
        ))}
    </div>
  )
}

export default Timeline
