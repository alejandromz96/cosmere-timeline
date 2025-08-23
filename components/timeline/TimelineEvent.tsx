'use client'
import { useState, useEffect, type FC } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { type CosmereEvent } from '@/types/cosmere'

type TimelineEventProps = {
  eventInfo: CosmereEvent
}

const TimelineEvent: FC<TimelineEventProps> = ({
  eventInfo: { id, title, date, location, description, color },
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpanded])

  return (
    <>
      <motion.div
        layoutId={`event-${id}`}
        onClick={() => setIsExpanded(true)}
        className={`w-fit max-w-full origin-left cursor-pointer rounded-xl rounded-l-none border-l-4 border-${color} p-3 pl-4`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-xl font-bold tracking-wide">{title}</h3>
        <p className="text-sm text-zinc-400">{date} · {location}</p>
        <p className="mt-2 text-base">{description}</p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsExpanded(false)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`event-${id}`}
                className="relative w-full max-w-lg bg-zinc-900 text-white p-6 rounded-2xl shadow-lg pointer-events-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  layout: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.45 },
                  y: { duration: 0.45 }
                }}
              >
                <button
                  aria-label="Cerrar"
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>

                <h3 className="text-3xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{date} · {location}</p>
                <p className="mt-4 text-base leading-relaxed">{description}</p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default TimelineEvent
