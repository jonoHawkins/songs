var chordsReg = /(\s*?[A-G][b#]?(m(aj)?)?(\d+?)?(sus)?\d{0,1}(\/[A-G][b3]?)?)(?:$|\s)/,
    stanzaReg = /^(?:intro|chorus|verse|pre-chorus|bridge|interlude|ending).*/i,

    processor = {};

processor.chordChart = function (chart) {
    // chart = chart.split('\n').map(function (line, index) {
    //  var type = chordsReg.test(line) ? 'chords' : 'lyrics';

    //  return {
    //      "type": type,
    //      "content": line
    //  };
    // });


    var chartRoot = [],
        currentParent = chartRoot,
        line,
        i;

    chart = chart.split('\n');

    for (i = 0; i < chart.length; i++) {
        line = {};

        chart[i] = chart[i].replace(/[\n\r]/g, '');

        if (stanzaReg.test(chart[i])) {
            currentParent = chartRoot;
            line.type = "stanza";
            line.name = chart[i];
            line.content = [];
        } else {

            // make sure we always have a stanza
            if (i === 0) {
                currentParent = chartRoot;
                line.type = "stanza";
                line.name = '';
                line.content = [];
                currentParent.push(line);
                currentParent = line.content;
                line = {};
            }

            // to do: fix chord test... might just be easier to test if there are words?
            if (chordsReg.test(chart[i])) {
                line.type = "chords";
            } else {
                line.type = "lyrics";
            }
            line.content = chart[i];
        }


        currentParent.push(line);

        if (line.type === "stanza") {
            currentParent = line.content;
        }
    }

    return chartRoot;
};

module.exports = processor;