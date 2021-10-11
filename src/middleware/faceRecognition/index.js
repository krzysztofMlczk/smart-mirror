const net = require('net');
const commands = require('./commands');
const tokenize = require('./tokenizer');
const launchFaceRecognizer = require('./launcher/launcher');

class FaceRecognition {
  constructor() {
    this.registeringProgressCallback = undefined;
    this.registeringSuccessCallback = undefined;

    launchFaceRecognizer()
      .then((ports) => {
        return this.setupConnection(ports);
      })
      /* eslint-disable promise/always-return */
      .then((msg) => {
        console.log(msg);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setupConnection = (ports) => {
    const [portSender, portReceiver] = ports;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.sender = net.createConnection({ port: portSender });

          this.receiver = net.createConnection({
            port: portReceiver,
            onread: {
              buffer: Buffer.alloc(255),
              callback: (nread, data) => {
                const msg = tokenize(data);

                switch (msg.command) {
                  case commands.PROGRESS:
                    this.registeringProgressCallback(msg.value);
                    break;
                  case commands.REGISTERED:
                    this.registeringSuccessCallback();
                    break;
                  case commands.ERROR:
                    // TODO: fire error callback
                    break;
                  case commands.FATAL:
                    // TODO: fire error callback
                    break;
                  default:
                    break;
                }
              },
            },
          });
        } catch (error) {
          reject(error);
        }

        resolve(
          `Connection to face recognizer module set up succesfully.\nRunning on ports: ${portSender}, ${portReceiver}`
        );
      }, 1000);
    });
  };

  setProgressCallback = (progressCallback) => {
    this.registeringProgressCallback = progressCallback;
  };

  setSuccessCallback = (successCallback) => {
    this.registeringSuccessCallback = successCallback;
  };

  register = (userName) => {
    this.sender.write(commands.REGISTER(userName));
  };
}

module.exports = new FaceRecognition();
