/**
 * This would be nice if @sencil/dev-server would support
 * SSR out-of-the-box
 */

const express                   = require('express');
const { readFile }              = require('fs');
const opn                       = require('opn');
const { join }                  = require('path');
const { build, createRenderer } = require('@stencil/core');
const sys                       = require('@stencil/core/bin/sys');
const util                      = require('@stencil/core/dist/cli/util');

const {
    devServer : {
        httpPort = 3030,
        root     = join(__dirname, '../www')
    } = {}
} = require('../stencil.config.js');

class Server {
    constructor ({ logLevel = 'debug' } = {}) {
        this.app = express();

        this.logLevel = logLevel;
    }

    get logger () {
        return this._logger || (this.logger = this.createLogger());
    }

    set logger (logger) {
        this._logger = logger;
    }

    get rendererConfig () {
        return this._rendererConfig || (this.rendererConfig = this.buildRendererConfig());
    }

    set rendererConfig (config) {
        this._rendererConfig = config;
    }

    get renderer () {
        return this._renderer || (this.renderer = this.createRenderer());
    }

    set renderer (renderer) {
        this._renderer = renderer;
    }

    buildRendererConfig () {
        const { logger } = this;

        return {
            logger,
            rootDir  : join(__dirname, `../`),
            buildDir : join(__dirname, `../${ root }/build/`)
        };
    }

    createLogger () {
        const { logLevel } = this;

        return new util.logger.CommandLineLogger({
            level   : logLevel,
            process : process
        });
    }

    createRenderer (rendererConfig = this.rendererConfig) {
        return createRenderer(rendererConfig);
    }

    setupRoutes () {
        const {
            app, logger, renderer,
            rendererConfig : { buildDir }
        } = this;

        app.use('/build', express.static(buildDir));

        app.get('/*', (req, res) => {
            logger.debug(`serve: ${req.url}`);

            const filePath = join(__dirname, `../${ root }/index.html`);

            readFile(filePath, 'utf-8', (err, html) => {
                if (err) {
                    logger.error(err);
                    res.send(err);
                } else {
                    // Render the initial app content through Stencil
                    renderer
                        .hydrateToString({
                            html, req
                        })
                        .then(results => res.send(results.html));
                }
          });
        });
    }

    listen () {
        const { app, logger } = this;

        this.setupRoutes();

        return new Promise(resolve => {
            app.listen(httpPort, () => {
                logger.debug(`Server started at http://localhost:${ httpPort }`);

                resolve();
            });
        });
    }

    build () {
        return new Promise((resolve, reject) => {
            process.env.IONIC_CLI_BIN = __filename;

            const cmdArgs = process.argv.slice();

            cmdArgs.push(
                'build',
                '--dev',
                '--watch',
                'run',
                'dev'
            );

            const config = util.cliConfig.parseConfig(process, cmdArgs, sys);

            sys.compiler = require('../package.json');

            if (!config.logger) {
                config.logger = this.logger;
            }

            build(config).then(resolve, reject);

            if (config.watch) {
                process.once('SIGINT', () => process.exit(0));
            }
        });
    }

    open () {
        opn(`http://localhost:${ httpPort }`);
    }
}

module.exports = Server;
