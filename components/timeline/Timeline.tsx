import { cosmereEvents } from '@/data/events'
import TimelineEvent from './TimelineEvent'

const Timeline = () => {
  return (
    <div className="flex flex-col gap-6 py-8">
      {cosmereEvents
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((eventInfo) => (
          <TimelineEvent key={eventInfo.id} eventInfo={eventInfo}/>
        ))}
    </div>
  )
}

export default Timeline
