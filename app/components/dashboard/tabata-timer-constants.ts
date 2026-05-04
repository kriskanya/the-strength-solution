export const TABATA_ROUNDS = 8
export const TABATA_WORK_SEC = 20
export const TABATA_REST_SEC = 10

/** Initial countdown before Tabata intervals begin */
export const COUNTDOWN_DURATION_SEC = 30

export type TabataSegmentKind = 'work' | 'rest'

export type TabataSegment = {
  kind: TabataSegmentKind
  duration: number
  round: number
}

export type AssessmentSegmentKind = 'countdown' | TabataSegmentKind

export type AssessmentSegment = {
  kind: AssessmentSegmentKind
  duration: number
  round: number
}

export function buildTabataSegments(): TabataSegment[] {
  const segs: TabataSegment[] = []
  for (let r = 1; r <= TABATA_ROUNDS; r++) {
    segs.push({ kind: 'work', duration: TABATA_WORK_SEC, round: r })
    segs.push({ kind: 'rest', duration: TABATA_REST_SEC, round: r })
  }
  return segs
}

export const TABATA_SEGMENTS = buildTabataSegments()

/** Countdown (30s) followed by 8× (20s work / 10s rest). */
export function buildAssessmentSegments(): AssessmentSegment[] {
  return [
    { kind: 'countdown', duration: COUNTDOWN_DURATION_SEC, round: 0 },
    ...buildTabataSegments(),
  ]
}

export const ASSESSMENT_SEGMENTS = buildAssessmentSegments()

export function totalAssessmentDurationSec(): number {
  return ASSESSMENT_SEGMENTS.reduce((acc, s) => acc + s.duration, 0)
}

/** @deprecated use totalAssessmentDurationSec — Tabata-only duration */
export function totalTabataDurationSec(): number {
  return TABATA_SEGMENTS.reduce((acc, s) => acc + s.duration, 0)
}

export function remainingAfterCurrent(
  segmentIndex: number,
  secondsLeft: number,
  segments: AssessmentSegment[] = ASSESSMENT_SEGMENTS
): number {
  let total = secondsLeft
  for (let i = segmentIndex + 1; i < segments.length; i++) {
    total += segments[i].duration
  }
  return total
}

export function formatMmSs(totalSec: number): string {
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
