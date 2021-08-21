import { Button, Row, Space, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useRecorder from './useRecorder';
import generateSentence from './generateSentence';
import demoApi from "../api/demoApi";

const { Title } = Typography;

const columns = [
    {
        title: 'Từ',
        dataIndex: 'word',
        key: 'word',
    },
    {
        title: 'Thời gian bắt đầu',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: 'Thời gian kết thúc',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: 'Confidence',
        dataIndex: 'confidence',
        key: 'confidence',
    }
]

function SpeechDemo() {
    let [audioURL, audioBase64, isRecording, startRecord, stopRecord, resetRecord] = useRecorder();
    const [sentence, setSentence] = useState("The quick brown fox jumps over the lazy dog");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [tableData, setTableData] = useState();

    const onRecordingClick = () => {
        if (!isRecording) {
            resetRecord();
            startRecord();
        } else {
            stopRecord();
        }
    }

    const onNewSentenceClick = () => {
        let newSentence = generateSentence();
        setSentence(newSentence);
    }

    const recognizeSpeech = () => {
        setLoading(true);
        let submitData = {
            config: {
                languageCode: "en-US",
                sampleRateHertz: 24000,
                // speechContexts: [
                //   { phrases: "The quick brown fox jumps over the lazy dog" },
                // ],
                enableWordTimeOffsets: true,
                enableWordConfidence: true,
            },
            audio: {
                content: audioBase64,
            },
        };
        demoApi
            .submitSpeechData(submitData)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setResult(res.data.results);

                let data = [];
                res.data.results[0].alternatives[0].words.forEach((item, index) => {
                    data.push({
                        key: index,
                        word: item.word,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        confidence: item.confidence,
                    })
                })
                setTableData(data);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="page-content">
            <Row align="middle" justify="center" className="demo-title">
                <h1>DEMO SPEECH-TO-TEXT</h1>
            </Row>
            <Row align="middle" justify="center" style={{ paddingBottom: 50 }}>
                <FontAwesomeIcon icon={faMicrophoneAlt} className={isRecording ? "microphone-icon active" : "microphone-icon"} />
            </Row>
            <Row align="middle" justify="center">
                <Title level={2} style={{ textAlign: 'center' }}>{sentence}</Title>
            </Row>
            <Row align="middle" justify="center" style={{ paddingBottom: 30, paddingTop: 10 }}>
                <audio src={typeof (audioURL) === 'string' ? audioURL : ""} controls />
            </Row>
            <Row align="middle" justify="center">
                <Space>
                    <Button type="primary" onClick={onRecordingClick}>{isRecording ? "Dừng ghi âm" : "Ghi âm"}</Button>
                    <Button onClick={onNewSentenceClick} disabled={isRecording}>Tạo câu mới</Button>
                    <Button disabled={typeof (audioURL) !== 'string' || isRecording} loading={loading} onClick={recognizeSpeech}>Gửi</Button>
                </Space>
            </Row>
            {result && tableData && Object.keys(tableData).length ?
                <>
                    <Row align="middle" justify="center" style={{ paddingTop: 30 }}>
                        <Title level={3}>Kết quả</Title>
                    </Row>
                    <Row align="middle" justify="center">
                        <Title level={4}>{result[0].alternatives[0].transcript} ({result[0].alternatives[0].confidence})</Title>
                    </Row>
                    <Row align="middle" justify="center" style={{ paddingTop: 30 }}>
                        <Title level={3}>Kết quả chi tiết</Title>
                    </Row>
                    <Row align="middle" justify="center">
                        <Table dataSource={tableData} columns={columns} />
                    </Row>
                </>
                : <></>}
        </div>
    )
}

export default SpeechDemo;