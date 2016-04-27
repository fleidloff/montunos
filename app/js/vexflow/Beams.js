export default class Beams {
    constructor(voice) {
        this.beams = this.beamsFromVoice(voice);
    }

    beamsFromVoice(voice) {
        const beatResolution = voice.time.resolution / voice.time.beat_value;
        const beams = [];

        let ticks = 0;
        let beamGroup = [];

        voice.tickables
            .filter(t => t.ignore_ticks===false)
            .forEach(t => {
                ticks += t.intrinsicTicks;
                if (t.noteType==="r") {
                    if (beamGroup.length >= 2) {
                        beams.push(beamGroup);
                    }
                    beamGroup = [];
                } else {
                    if (t.intrinsicTicks <= 2096) {
                        beamGroup.push(t);
                    }
                }

                if (ticks >= beatResolution) {
                    if (beamGroup.length >= 2) {
                        beams.push(beamGroup);
                    }
                    beamGroup = [];
                    while (ticks >= beatResolution) {
                        ticks -= beatResolution;
                    }  
                }

            });
        if (beamGroup.length >= 2) {
            beams.push(beamGroup);
        }

        return beams.map(arr => new Vex.Flow.Beam(arr));
    }

    push(notes) {
        if (notes.length < 2) {
            return;
        }
        this.beams.push(new Vex.Flow.Beam(notes));
    }

    draw(ctx) {
        this.beams.forEach(beam => {
            beam.setContext(ctx).draw();
        });
    }
}
