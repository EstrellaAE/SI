export interface StatsData {
    participationByEvent: { porcentajeParticipacion: number }[];
    globalAttendance: { globalAttendance: number }[];
    participacionPorGenero: { genero: string, total: number, porcentaje: string }[];
}
