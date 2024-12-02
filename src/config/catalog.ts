export const specialties = [
  {
    nombre: "Medicina General",
    descripcion: "Consultas iniciales y manejo de problemas de salud comunes.",
  },
  {
    nombre: "Pediatría",
    descripcion: "Atención médica especializada para niños.",
  },
  {
    nombre: "Ginecología y Obstetricia",
    descripcion:
      "Servicios de salud para mujeres, incluyendo control prenatal y revisiones ginecológicas.",
  },
  {
    nombre: "Medicina Interna",
    descripcion:
      "Diagnóstico y tratamiento de enfermedades complejas en adultos.",
  },
  {
    nombre: "Traumatología y Ortopedia",
    descripcion: "Atención a lesiones musculoesqueléticas y fracturas comunes.",
  },
  {
    nombre: "Radiología",
    descripcion: "Rayos X, ultrasonidos y estudios de imagen para diagnóstico.",
  },
  {
    nombre: "Laboratorio Clínico",
    descripcion: "Análisis de sangre, orina y otros estudios básicos.",
  },
  {
    nombre: "Cardiología",
    descripcion:
      "Atención a problemas cardiovasculares básicos, como hipertensión o arritmias.",
  },
  {
    nombre: "Dermatología",
    descripcion: "Diagnóstico y tratamiento de afecciones comunes de la piel.",
  },
  {
    nombre: "Psiquiatría/Psicología Clínica",
    descripcion: "Atención inicial a problemas de salud mental.",
  },
];

export const getRandomSpecialty = () => {
  return specialties[Math.floor(Math.random() * specialties.length)];
};