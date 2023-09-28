import HeaderImage from "@/public/projects/radio-control/header.jpg";
import PorfileImage from "@/public/profile.jpg";

const transmitterCode = `
	/*
		Radio Transmitter Code
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   github.com/Choaib-ELMADI
	*/

	#include <SPI.h>
	#include "nRF24L01.h"
	#include "RF24.h"

	RF24 radio(7, 8);
	const byte address[6] = "ABCDE";

	typedef struct {
		int xL;
		int yL;
		int xR;
		int yR;
	} DATA;
	DATA data;

	int xLeft  = A0;
	int yLeft  = A1;
	int xRight = A2;
	int yRight = A3;

	void setup() {  
		radio.begin();
		radio.openWritingPipe(address);
		radio.setPALevel(RF24_PA_MIN);
		radio.stopListening();
	}

	void loop() {
		int xLeftValue  = analogRead(xLeft);
		int yLeftValue  = analogRead(yLeft);
		int xRightValue = analogRead(xRight);
		int yRightValue = analogRead(yRight);
	
		data.xL = xLeftValue;
		data.yL = yLeftValue;
		data.xR = xRightValue;
		data.yR = yRightValue;
	
		radio.write(&data, sizeof(DATA));
	}

`;
const receiverCode = `
	/*
		Radio Receiver Code
		by Choaib ELMADI   https://elmadichoaib.vercel.app

		Give it a star :   github.com/Choaib-ELMADI
	*/

	#include <SPI.h>
	#include "nRF24L01.h"
	#include "RF24.h"
	
	#include <Servo.h>
	
	RF24 radio(7, 8);
	const byte address[6] = "ABCDE";
	
	Servo Servo01;
	Servo Servo02;
	int Servo01Pin = 2;
	int Servo02Pin = 3;
			
	typedef struct {
		int xL;
		int yL;
		int xR;
		int yR;
	} DATA;
	DATA data;
	
	void setup() {
		radio.begin();
		radio.openReadingPipe(0, address);
		radio.setPALevel(RF24_PA_MIN);
		radio.startListening();
	
		Servo01.attach(Servo01Pin);
		Servo02.attach(Servo02Pin);
		Servo01.write(0);
		Servo02.write(0);
	}

	void loop() {
		if (radio.available()) {
			radio.read(&data, sizeof(DATA));
	
			int angle01 = map(data.xL, 0, 1023, 0, 179);
			int angle02 = map(data.yL, 0, 1023, 0, 179);
			Servo01.write(angle01);
			Servo02.write(angle02);
		}
	}

`;

import NavigateToOtherProjects from "@/components/utils/navigate-other-projects";
import { CircuitDiagram, AssembleParts, Introduction, Steps } from "./utils";
import AuthorInfo from "@/components/utils/author-info";
import Support from "@/components/utils/support";
import Header from "@/components/utils/header";
import Code from "@/components/utils/code";

export default function RadioControl() {
	return (
		<div className="w-full max-w-[1200px] mx-auto">
			<Header
				props={{
					banner: HeaderImage,
					profile: PorfileImage,
					title: "DIY Arduino Radio Controller",
					link: "https://elmadichoaib.vercel.app",
					user: "Choaib ELMADI",
				}}
			/>
			<div className="grid grid-cols-1 dm:grid-cols-[auto_300px] gap-1">
				<div>
					<Introduction />
					<Steps />
					<CircuitDiagram
						props={{
							id: "project-circuit-trs",
							title: "Transmitter Circuit Diagram",
							description:
								"First of all, we need to create the electronic circuit for our transmitter. It consists of an Arduino Nano, 2 joysticks, a NRF24L01 module and a 100uF capacitor.",
							image: "/projects/radio-control/transmitter-circuit.png",
						}}
					/>
					<AssembleParts
						props={{
							id: "solder-electronics-trs",
							title: "Transmitter Circuit Diagram",
							description:
								"First of all, we need to create the electronic circuit for our transmitter. It consists of an Arduino Nano, 2 joysticks, a NRF24L01 module and a 100uF capacitor.",
							images: [
								"/projects/radio-control/transmitter-assembly-1.jpg",
								"/projects/radio-control/transmitter-assembly-2.jpg",
								"/projects/radio-control/transmitter-assembly-3.jpg",
							],
							conclusion:
								"And Now, our radio transmitter is ready and we can repeat the same process with the receiver.",
						}}
					/>
					<Code
						props={{
							id: "project-code-trs",
							title: "Arduino Code",
							description:
								"NB: The address for both the receiver and the transmitter must be the same.",
							githubLink: "https://github.com/Choaib-ELMADI",
							code: transmitterCode,
						}}
					/>
					<NavigateToOtherProjects
						props={{
							prev: "/",
							prevTitle: "Home",
							next: "/projects/solar-panel",
							nextTitle: "Solar Panel",
						}}
					/>
					<Support />
				</div>
				<AuthorInfo
					props={{
						profile: PorfileImage,
						description:
							"I'm a junior full-stack developer with 2+ years of experience in web technologies like HTML, CSS, JavaScript, React.js, Next.js, Node.js, Express, and databases like MongoDB and Firebase. I'm also an electronics engineering student who loves creating robots with Arduino and Raspberry Pi.",
						name: "Choaib ELMADI",
						link: "https://elmadichoaib.vercel.app",
					}}
				/>
			</div>
		</div>
	);
}
