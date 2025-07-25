import React from 'react'
import Link from 'next/link'
import { buildDays, mainDays } from './data'

const LW14Summary = () => {
  const days = mainDays()

  return (
    <div
      style={{
        fontFamily: 'Departure Mono, Source Code Pro, Office Code Pro, Menlo, monospace',
      }}
      className="w-full border bg-alternative-200 flex flex-col rounded-lg text-foreground-lighter mt-12"
    >
      <div className="w-full p-4 flex justify-between items-center">
        <Link
          href="/launch-week/14"
          className="flex items-center text-foreground font-medium gap-1.5 leading-none uppercase text-xs opacity-80 transition-opacity hover:opacity-100"
        >
          Launch Week 14
        </Link>
        <div className="uppercase tracking-wide text-xs">Mar 31 - Apr 04 '25</div>
      </div>
      <div className="pb-4 border-t p-4">
        <ul className="flex flex-col gap-2">
          {days.map(
            (day, i: number) =>
              day.shipped && (
                <ol key={day.id}>
                  <Link href={day.blog} className="group flex py-1 gap-2 hover:text-foreground">
                    <span className="shrink-0 text-sm uppercase leading-6">Day {i + 1} -</span>
                    <span className="leading-6">{day.title}</span>
                  </Link>
                </ol>
              )
          )}
        </ul>
      </div>
      <div className="w-[calc(100%+2px)] bg-surface-100 flex flex-col gap-2 -m-px border rounded-lg">
        <div className="p-4">
          <div className=" uppercase text-xs text-foreground tracking-wide">Build Stage</div>
          <ul className="flex flex-col gap-2 mt-4">
            {buildDays.map(
              (day, i: number) =>
                day.is_shipped && (
                  <ol key={day.id}>
                    <Link
                      href={day.links[0].url}
                      className="relative flex items-center justify-between group w-full py-1 hover:text-foreground"
                    >
                      <span className="relative">
                        <span className=" uppercase mr-2">
                          {i + 1 < 10 ? '0' : ''}
                          {i + 1} -
                        </span>
                        {day.title}
                      </span>
                    </Link>
                  </ol>
                )
            )}
            <ol className="border-t pt-4 mt-2">
              <Link
                href="/events?category=meetup"
                className="relative flex items-center justify-between group w-full py-1 hover:text-foreground"
              >
                Community Meetups
              </Link>
            </ol>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LW14Summary
