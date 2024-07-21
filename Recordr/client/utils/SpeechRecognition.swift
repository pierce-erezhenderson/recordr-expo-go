import Foundation
import Speech

@objc(SpeechRecognition)
class SpeechRecognition: RCTEventEmitter {
  
  private var recognitionTask: SFSpeechRecognitionTask?
  private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))!
  private let audioEngine = AVAudioEngine()
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return ["onSpeechResult"]
  }
  
  @objc (start)
  func start() {
    SFSpeechRecognizer.requestAuthorization { authStatus in
      OperationQueue.main.addOperation {
        switch authStatus {
        case .authorized:
          self.startRecognition()
        default:
          print("Speech recognition not authorized")
        }
      }
    }
  }
  
  @objc (stop)
  func stop() {
    audioEngine.stop()
    recognitionTask?.cancel()
  }
  
  private func startRecognition() {
    let audioSession = AVAudioSession.sharedInstance()
    do {
      try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
      try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
    } catch {
      print("Audio session setup failed")
      return
    }
    
    let inputNode = audioEngine.inputNode
    let recordingFormat = inputNode.outputFormat(forBus: 0)
    
    inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
      let request = SFSpeechAudioBufferRecognitionRequest()
      request.shouldReportPartialResults = true
      
      self.recognitionTask = self.speechRecognizer.recognitionTask(with: request) { result, error in
        if let result = result {
          self.sendEvent(withName: "onSpeechResult", body: ["value": result.bestTranscription.formattedString])
        }
        if error != nil {
          self.audioEngine.stop()
          inputNode.removeTap(onBus: 0)
        }
      }
    }
    
    audioEngine.prepare()
    do {
      try audioEngine.start()
    } catch {
      print("Audio engine failed to start")
    }
  }
}