//INFO EQUIPOS

const NombresEquipos = ["Qatar", "Ecuador", "Senegal", "Holanda", "Inglaterra", "Irán", "Estados Unidos", "Wales", "Argentina", "Arabia Saudita", "México", "Polonia", "Francia", "Autralia", "Dinamarca", "Tunez", "Bélgica", "Canadá", "Marruecos", "Croacia", "España", "Costa Rica", "Alemania", "Japón", "Bélgica", "Canadá", "Marruecos", "Croacia", "Brasil", "Serbia", "Suiza", "Camerún"]
const Grupo = ["A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D", "F", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "H"]
const Flag = ["Qatar.svg", "Ecuador.png", "Senegal.png", "Holanda.png", "Inglaterra.png", "Iran.png", "Estados-Unidos.png", "Wales.png", "Argentina.png", "Arabia Saudita.png", "México.png", "Polonia.png", "Francia.png", "Autralia.png", "Dinamarca.png", "Tunez.png", "Belgica.png", "Canada.png", "Marruecos.png", "Croacia.png", "España.png", "Costa-Rica.png", "Alemania.png", "Japon.png", "Belgica.png", "Canada.png", "Marruecos.png", "Croacia.png", "Brasil.png", "Serbia.png", "Suiza.png", "Camerun.png"]
const PositionInGroup = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]

//CREO EQUIPOS
function CrearEquipo (nombre, group, groupRank, flag) {
    this.nombre = nombre;
    this.group = group;
    this.groupRank = groupRank;
    this.flag = flag;
}

var Equipos = []

for (let i = 0; i < NombresEquipos.length; i++) {
    let Equipo = new CrearEquipo(NombresEquipos[i], Grupo[i], PositionInGroup[i], Flag[i])
    Equipos.push (Equipo)
}

// CREO PARTIDOS
function CrearPartido (id, Local, Visitante, dia, hora, resultado=[0, 0]) {
    this.id = id;
    this.Local = Local;
    this.Visitante = Visitante;
    this.dia = dia;
    this.hora = hora;
    this.resultado = resultado;
    
    this.resultadoPartido = function resultado (){
        console.log("El resultado fue: ", this.Local.nombre, " = ", this.resultado[0]," | ", this.Visitante.nombre, " = ", this.resultado[1])
    }
    this.cargarResultado = function (A, B){
        this.resultado = [A, B]
    }
    // Acá tengo que empezar a poner todas las funciones :(
}

// FORMATEO DE FECHAS Y HORAS
function formatDate(date) {
    return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ].join('/');
  }

function formatHours(date) {
    return [
        date.getHours(),
        date.getMinutes(),
    ].join(':');
}

//EQUIPOS POR GRUPOS
const cantidadEquiposPorGrupo = 4 
const cantidadPartidos = (cantidadEquiposPorGrupo * cantidadEquiposPorGrupo - 1) / 2

let partidosGrupoA = [] 
let partidosGrupoB = []
let partidosGrupoC = []
let partidosGrupoD = []
let partidosGrupoE = []
let partidosGrupoF = []
let partidosGrupoG = []
let partidosGrupoH = []

//INDEXACIÓN DE EQUIPOS POR GRUPOS

for (let i = 0; i < cantidadEquiposPorGrupo -1; i++){
    const local = i
    for (let j = 1 + i; j < cantidadEquiposPorGrupo; j++ ){
        const fecha = new Date()
        partidosGrupoA.push (new CrearPartido (Math.random(), Equipos[i],Equipos[j],formatDate(fecha), formatHours(fecha)))
        partidosGrupoB.push (new CrearPartido (Math.random(), Equipos[i+4],Equipos[j+4],formatDate(fecha), formatHours(fecha)))
        partidosGrupoC.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
        partidosGrupoD.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
        partidosGrupoE.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
        partidosGrupoF.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
        partidosGrupoG.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
        partidosGrupoH.push (new CrearPartido (Math.random(), Equipos[i+8],Equipos[j+8],formatDate(fecha), formatHours(fecha)))
    }
}


console.log(partidosGrupoA)
console.log(partidosGrupoB)
console.log(partidosGrupoC)
console.log(partidosGrupoD)
console.log(partidosGrupoE)
console.log(partidosGrupoF)
console.log(partidosGrupoG)
console.log(partidosGrupoH)

const partidoX = partidosGrupoA[1]
const partidoX2 = partidosGrupoA[2]
const partidoX3 = partidosGrupoA[3]
const partidoX4 = partidosGrupoA[4]

// let GolesLocal = parseInt(prompt("Cargar Resultado Local: "))
// let GolesVisitante = parseInt(prompt("Cargar Resultado Visitante: "))
// alert("Cargaste el resultado del primer partido :)")

partidoX.cargarResultado(GolesLocal, GolesVisitante)
partidoX2.cargarResultado(GolesLocal, GolesVisitante)
partidoX3.cargarResultado(GolesLocal, GolesVisitante)
partidoX4.cargarResultado(GolesLocal, GolesVisitante)


partidoX.resultadoPartido()
partidoX2.resultadoPartido()
partidoX3.resultadoPartido()
partidoX4.resultadoPartido()








