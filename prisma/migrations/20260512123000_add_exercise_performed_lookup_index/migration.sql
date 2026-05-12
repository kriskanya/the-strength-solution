-- CreateIndex
CREATE INDEX "ExercisePerformed_userId_source_exerciseId_datePerformed_idx" ON "ExercisePerformed"("userId", "source", "exerciseId", "datePerformed" DESC);
