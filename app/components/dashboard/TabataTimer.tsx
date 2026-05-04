'use client'

import { Dialog } from '@headlessui/react'
import { useCallback, useEffect, useReducer, useRef } from 'react'
import {
  ASSESSMENT_SEGMENTS,
  COUNTDOWN_DURATION_SEC,
  TABATA_ROUNDS,
  formatMmSs,
  remainingAfterCurrent,
  totalAssessmentDurationSec,
  type AssessmentSegment,
} from '@/app/components/dashboard/tabata-timer-constants'

type Phase = 'idle' | 'running' | 'paused' | 'complete'

type State = {
  phase: Phase
  segmentIndex: number
  secondsLeft: number
}

const initialState: State = {
  phase: 'idle',
  segmentIndex: 0,
  secondsLeft: COUNTDOWN_DURATION_SEC,
}

type Action =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TICK' }
  | { type: 'RESET' }
  | { type: 'SKIP_NEXT' }
  | { type: 'SKIP_PREV' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState
    case 'START':
      return {
        phase: 'running',
        segmentIndex: 0,
        secondsLeft: ASSESSMENT_SEGMENTS[0].duration,
      }
    case 'PAUSE':
      if (state.phase === 'running') return { ...state, phase: 'paused' }
      return state
    case 'RESUME':
      if (state.phase === 'paused') return { ...state, phase: 'running' }
      return state
    case 'SKIP_NEXT': {
      if (state.phase === 'complete') return state
      const next = state.segmentIndex + 1
      if (next >= ASSESSMENT_SEGMENTS.length) {
        return {
          phase: 'complete',
          segmentIndex: ASSESSMENT_SEGMENTS.length - 1,
          secondsLeft: 0,
        }
      }
      return {
        ...state,
        segmentIndex: next,
        secondsLeft: ASSESSMENT_SEGMENTS[next].duration,
        phase: state.phase === 'idle' ? 'idle' : state.phase,
      }
    }
    case 'SKIP_PREV': {
      if (state.phase === 'complete') return state
      const prev = Math.max(0, state.segmentIndex - 1)
      return {
        ...state,
        segmentIndex: prev,
        secondsLeft: ASSESSMENT_SEGMENTS[prev].duration,
        phase: state.phase === 'idle' ? 'idle' : state.phase,
      }
    }
    case 'TICK': {
      if (state.phase !== 'running') return state
      if (state.secondsLeft > 1) {
        return { ...state, secondsLeft: state.secondsLeft - 1 }
      }
      if (state.segmentIndex >= ASSESSMENT_SEGMENTS.length - 1) {
        return { ...state, phase: 'complete', secondsLeft: 0 }
      }
      const nextIdx = state.segmentIndex + 1
      return {
        phase: 'running',
        segmentIndex: nextIdx,
        secondsLeft: ASSESSMENT_SEGMENTS[nextIdx].duration,
      }
    }
    default:
      return state
  }
}

function segmentLabel(seg: AssessmentSegment, index: number): string {
  const n = index + 1
  if (seg.kind === 'countdown') {
    return `${n}. Countdown: ${seg.duration}s · before Tabata`
  }
  const kind = seg.kind === 'work' ? 'Work' : 'Rest'
  const activity = seg.kind === 'work' ? 'Go' : 'Recover'
  return `${n}. ${kind}: ${seg.duration} · ${activity}`
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  )
}

function PauseIconMini({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function PlayIconMini({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  )
}

function StopSquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 6h12v12H6z" />
    </svg>
  )
}

function SkipBackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 6h2v12H6V6zm11 0v12l-8-6 8-6z" />
    </svg>
  )
}

function SkipForwardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 6h2v12h-2V6zM5 18V6l8 6-8 6z" />
    </svg>
  )
}

/** Large window + small corner tile = “shrink to mini timer” (picture-in-picture style). */
function ShrinkToMiniIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="12" height="12" rx="2" fill="#007DD9" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}

/** Expand back to full-screen timer (corners outward). */
function ExpandFullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M9 3H4v5M15 3h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  )
}

interface TabataTimerProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  minimized: boolean
  setMinimized: (value: boolean) => void
}

export default function TabataTimer({ isOpen, setIsOpen, minimized, setMinimized }: TabataTimerProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      dispatch({ type: 'RESET' })
      setMinimized(false)
    }
    wasOpenRef.current = isOpen
  }, [isOpen, setMinimized])

  const resetTimer = useCallback(() => {
    dispatch({ type: 'RESET' })
    void wakeLockRef.current?.release().catch(() => {})
    wakeLockRef.current = null
  }, [])

  const resetAndClose = useCallback(() => {
    resetTimer()
    setMinimized(false)
    setIsOpen(false)
    wasOpenRef.current = false
  }, [resetTimer, setIsOpen, setMinimized])

  useEffect(() => {
    if (state.phase !== 'running') return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => window.clearInterval(id)
  }, [state.phase])

  useEffect(() => {
    if (state.phase !== 'running' || minimized) return
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return
    let cancelled = false
    ;(navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<WakeLockSentinel> } }).wakeLock
      ?.request('screen')
      .then((lock) => {
        if (cancelled) {
          void lock.release()
          return
        }
        wakeLockRef.current = lock
      })
      .catch(() => {})
    return () => {
      cancelled = true
      void wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [state.phase, minimized])

  const totalDur = totalAssessmentDurationSec()
  const remaining =
    state.phase === 'idle'
      ? totalDur
      : state.phase === 'complete'
        ? 0
        : remainingAfterCurrent(state.segmentIndex, state.secondsLeft)
  const progress = 1 - remaining / totalDur

  const currentSeg = ASSESSMENT_SEGMENTS[state.segmentIndex]
  const tabataRoundDisplay =
    state.phase === 'complete'
      ? TABATA_ROUNDS
      : currentSeg.kind === 'work' || currentSeg.kind === 'rest'
        ? currentSeg.round
        : null

  const handleDialogClose = () => {
    if (state.phase === 'running' && !minimized) {
      setMinimized(true)
      return
    }
    resetAndClose()
  }

  const centerValue =
    state.phase === 'idle'
      ? COUNTDOWN_DURATION_SEC
      : state.phase === 'complete'
        ? 0
        : state.secondsLeft

  const mainCounterColorClass =
    state.phase === 'complete'
      ? 'text-white'
      : state.phase === 'idle'
        ? 'text-white/90'
        : currentSeg.kind === 'countdown'
          ? 'text-[#D2E5F2]'
          : currentSeg.kind === 'work'
            ? 'text-green-advanced'
            : 'text-brand-blue'

  if (!isOpen) return null

  if (minimized) {
    const phaseLine =
      state.phase === 'complete'
        ? 'Done'
        : state.phase === 'idle'
          ? 'Ready'
          : currentSeg.kind === 'countdown'
            ? 'Countdown'
            : `${currentSeg.kind === 'work' ? 'Work' : 'Rest'} · ${tabataRoundDisplay}/${TABATA_ROUNDS}`

    return (
      <div
        className="fixed bottom-4 right-4 z-[60] min-h-[8.5rem] w-fit min-w-[min(19rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-3xl border border-brand-blue/50 bg-black-russian px-5 pb-5 pt-10 shadow-2xl ring-1 ring-white/10 sm:bottom-6 sm:right-6 sm:min-w-[21rem] sm:px-6 sm:pb-5 sm:pt-10"
        role="region"
        aria-label="Tabata timer (compact)"
      >
        <button
          type="button"
          className="absolute right-2 top-2 rounded-lg p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
          aria-label="Open full screen timer"
          title="Full screen"
          onClick={() => setMinimized(false)}
        >
          <ExpandFullIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        <div className="flex items-stretch justify-start gap-3">
          <div className="inter flex min-w-0 flex-col gap-1">
            <span
              className={`inline-block min-w-[3ch] text-5xl font-bold leading-none tabular-nums transition-colors duration-300 sm:min-w-[3.25ch] sm:text-6xl ${mainCounterColorClass}`}
            >
              {state.phase === 'complete' ? '✓' : centerValue}
            </span>
            <span className="text-base font-semibold text-[#D2E5F2]">{phaseLine}</span>
            <span className="text-sm tabular-nums text-light-grey">{formatMmSs(remaining)} left</span>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-l border-white/15 pl-3">
            {state.phase === 'running' ? (
              <button
                type="button"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-intermediate shadow-md ring-2 ring-orange-intermediate/50 transition hover:brightness-110 active:scale-95"
                aria-label="Pause"
                onClick={() => dispatch({ type: 'PAUSE' })}
              >
                <PauseIconMini className="text-white" />
              </button>
            ) : (
              <button
                type="button"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-advanced pl-0.5 shadow-md ring-2 ring-green-advanced/50 transition hover:brightness-110 active:scale-95"
                aria-label={
                  state.phase === 'paused'
                    ? 'Resume'
                    : state.phase === 'complete'
                      ? 'Start again'
                      : 'Start assessment'
                }
                onClick={() =>
                  state.phase === 'paused' ? dispatch({ type: 'RESUME' }) : dispatch({ type: 'START' })
                }
              >
                <PlayIconMini className="text-white" />
              </button>
            )}

            <button
              type="button"
              className="inter flex h-10 min-w-[4.5rem] items-center justify-center gap-1.5 rounded-full bg-red-novice px-3 text-xs font-bold uppercase tracking-wide text-white shadow-md ring-1 ring-red-novice/40 transition hover:brightness-110 active:scale-[0.98]"
              aria-label="Stop and reset timer"
              onClick={resetTimer}
            >
              <StopSquareIcon className="h-3.5 w-3.5 text-white" />
              Stop
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onClose={handleDialogClose} className="relative z-[60]">
      <div className="fixed inset-0 flex flex-col bg-black-russian">
        <div
          className={`flex flex-1 flex-col px-5 pb-8 pt-6 sm:px-10 ${
            state.phase === 'idle'
              ? 'bg-gradient-to-b from-white/[0.06] to-black-russian'
              : state.phase === 'complete'
                ? 'bg-gradient-to-b from-white/[0.06] to-black-russian'
                : currentSeg.kind === 'countdown'
                  ? 'bg-gradient-to-b from-[#D2E5F2]/20 to-black-russian'
                  : currentSeg.kind === 'work'
                    ? 'bg-gradient-to-b from-brand-blue/25 to-black-russian'
                    : 'bg-gradient-to-b from-[#D2E5F2]/12 to-black-russian'
          }`}
        >
          <div className="grid grid-cols-3 items-center text-white/90">
            <button
              type="button"
              className="justify-self-start rounded-lg p-2 text-white/90 hover:bg-white/10"
              aria-label="Shrink timer to compact bar"
              title="Shrink to compact timer"
              onClick={() => setMinimized(true)}
            >
              <ShrinkToMiniIcon />
            </button>
            <span className="inter justify-self-center text-base font-medium tabular-nums sm:text-lg">
              {formatMmSs(remaining)}
            </span>
            <button
              type="button"
              className="justify-self-end rounded-lg p-2 text-2xl leading-none text-white/75 hover:bg-white/10 hover:text-white"
              aria-label="Close timer and reset"
              title="Close"
              onClick={resetAndClose}
            >
              ×
            </button>
          </div>

          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                state.phase === 'idle' || state.phase === 'complete'
                  ? 'bg-brand-blue/40'
                  : currentSeg.kind === 'countdown'
                    ? 'bg-white/70'
                    : currentSeg.kind === 'work'
                      ? 'bg-brand-blue'
                      : 'bg-[#D2E5F2]'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>

          <div className="mt-auto flex flex-1 flex-col items-center justify-center">
            <p
              className={`inter mb-2 text-sm font-medium uppercase tracking-wide ${
                state.phase === 'idle'
                  ? 'text-light-grey'
                  : state.phase === 'complete'
                    ? 'text-light-grey'
                    : currentSeg.kind === 'countdown'
                      ? 'text-[#D2E5F2]'
                      : currentSeg.kind === 'work'
                        ? 'text-brand-blue'
                        : 'text-[#D2E5F2]'
              }`}
            >
              {state.phase === 'idle'
                ? '30s countdown · then 8× (20s go / 10s rest)'
                : state.phase === 'complete'
                  ? 'Session complete'
                  : currentSeg.kind === 'countdown'
                    ? 'Countdown'
                    : currentSeg.kind === 'work'
                      ? `Work · Round ${currentSeg.round}`
                      : `Rest · Round ${currentSeg.round}`}
            </p>
            <span
              className={`inter text-[clamp(5rem,22vw,10rem)] font-bold leading-none tabular-nums transition-colors duration-300 ${mainCounterColorClass}`}
            >
              {state.phase === 'complete' ? '✓' : centerValue}
            </span>

            <div className="mt-8 flex flex-col items-center gap-5">
              {state.phase === 'running' ? (
                <button
                  type="button"
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-orange-intermediate shadow-lg ring-4 ring-orange-intermediate/40 transition hover:brightness-110 active:scale-95"
                  aria-label="Pause"
                  onClick={() => dispatch({ type: 'PAUSE' })}
                >
                  <PauseIcon className="text-white" />
                </button>
              ) : state.phase === 'idle' ? (
                <button
                  type="button"
                  className="inter rounded-xl bg-brand-blue px-12 py-4 text-base font-semibold text-white shadow-lg ring-2 ring-brand-blue/40 transition hover:brightness-110 active:scale-[0.98]"
                  onClick={() => dispatch({ type: 'START' })}
                >
                  Start assessment
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-green-advanced pl-1 shadow-lg ring-4 ring-green-advanced/40 transition hover:brightness-110 active:scale-95"
                  aria-label={
                    state.phase === 'paused' ? 'Resume' : state.phase === 'complete' ? 'Start again' : 'Start'
                  }
                  onClick={() =>
                    state.phase === 'paused' ? dispatch({ type: 'RESUME' }) : dispatch({ type: 'START' })
                  }
                >
                  <PlayIcon className="text-white" />
                </button>
              )}

              <button
                type="button"
                className="inter flex items-center gap-2 rounded-full bg-red-novice px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md ring-2 ring-red-novice/50 transition hover:brightness-110 active:scale-[0.98]"
                aria-label="Stop and reset timer"
                onClick={resetTimer}
              >
                <StopSquareIcon className="text-white" />
                Stop
              </button>
            </div>
          </div>

          <div className="mx-auto mt-6 w-full max-w-md border-t border-white/10">
            <ul className="max-h-[28vh] overflow-y-auto">
              {ASSESSMENT_SEGMENTS.map((seg, i) => {
                const active = i === state.segmentIndex && state.phase !== 'idle' && state.phase !== 'complete'
                const past = i < state.segmentIndex && state.phase !== 'idle'
                return (
                  <li
                    key={`${seg.kind}-${seg.round}-${i}`}
                    className={`inter border-b border-white/10 py-3 text-sm ${
                      active
                        ? 'rounded-md bg-white/10 px-3 font-semibold text-white'
                        : past
                          ? 'text-white/35'
                          : 'text-white/70'
                    }`}
                  >
                    {segmentLabel(seg, i)}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-center gap-12 text-white">
            <button
              type="button"
              className="rounded-full p-3 hover:bg-white/10 disabled:opacity-30"
              aria-label="Previous interval"
              disabled={state.phase === 'idle' || state.phase === 'complete' || state.segmentIndex === 0}
              onClick={() => dispatch({ type: 'SKIP_PREV' })}
            >
              <SkipBackIcon />
            </button>
            <span className="inter min-w-[3rem] text-center text-lg font-semibold tabular-nums">
              {tabataRoundDisplay === null ? 'Countdown' : `${tabataRoundDisplay}/${TABATA_ROUNDS}`}
            </span>
            <button
              type="button"
              className="rounded-full p-3 hover:bg-white/10 disabled:opacity-30"
              aria-label="Next interval"
              disabled={state.phase === 'idle' || state.phase === 'complete'}
              onClick={() => dispatch({ type: 'SKIP_NEXT' })}
            >
              <SkipForwardIcon />
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="inter text-sm font-medium text-light-grey underline-offset-2 hover:text-white hover:underline"
              onClick={resetAndClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export function TabataTimerNavButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inter flex h-10 shrink-0 items-center gap-2 rounded border border-light-grey bg-[#333333] px-3 text-sm font-semibold text-white hover:border-brand-blue hover:bg-[#3d3d3d] sm:px-4"
      aria-label="Open Tabata timer"
    >
      <ClockIcon className="text-brand-blue" />
      <span className="hidden sm:inline">Tabata</span>
    </button>
  )
}
