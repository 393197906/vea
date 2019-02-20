const chunksToMap = function(chunks) {
    return chunks.reduce((memo, chunk) => {
        memo[chunk.name || chunk.id] = chunk.files;
        return memo;
    }, {});
}
module.exports  = class test {
    constructor(options) {

    }

    apply(compiler) {
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            const chunksMap = chunksToMap(compilation.chunks);
            for (var filename in compilation.assets) {
                // console.log(filename);
            }
            const test = "hello webpack plugin"
            compilation.assets['filelist.md'] = {
                source: function() {
                    return test;
                },
                size: function() {
                    return test.length;
                }
            };
        })
    }
};
