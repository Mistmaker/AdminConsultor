export class Evaluaciones {
    id_categoria!: number;
    id_padre!: number;
    nombre!: string;
    cantidad_preguntas!: number;
    metodo_calificacion!: string;
    grupo!: string;
    preguntas!: Preguntas[];
}

export class Preguntas {
    id_pregunta!: number;
    id_categoria!: number;
    pregunta!: string;
    activo!: boolean;
    comentario!: string;
    link_comentario!: string;
    texto_link_comentario!: string;
    respuestas!: Respuestas[];
}

export class Respuestas {
    id_respuesta!: number;
    id_pregunta!: number;
    respuesta!: string;
    respuesta_valida!: boolean;
    activo!: boolean;
}