const net = require('net');
const commands = require('./commands');
const tokenize = require('./tokenizer');
const launchFaceRecognizer = require('./launcher/launcher');

class FaceRecognition {
  constructor() {
    this.onRegisterProgress = undefined;
    this.onRegisterSuccess = undefined;
    this.onRecognitionSuccess = undefined;

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
          this.sender = net.createConnection({ port: portReceiver });

          this.receiver = net.createConnection({
            port: portSender,
            onread: {
              buffer: Buffer.alloc(255),
              callback: (nread, data) => {
                const msg = tokenize(data);

                switch (msg.command) {
                  case commands.PROGRESS:
                    this.onRegisterProgress(msg.value);
                    break;
                  case commands.REGISTERED:
                    this.onRegisterSuccess();
                    break;
                  case commands.RECOGNIZED:
                    this.onRecognitionSuccess(msg.value);
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
    this.onRegisterProgress = progressCallback;
  };

  setSuccessCallback = (successCallback) => {
    this.onRegisterSuccess = successCallback;
  };

  register = (userName) => {
    this.sender.write(commands.REGISTER(userName));
  };

  recognize = (recognizedCallback) => {
    this.onRecognitionSuccess = recognizedCallback;
    this.sender.write(commands.RECOGNIZE);
  };
}

module.exports = new FaceRecognition();
