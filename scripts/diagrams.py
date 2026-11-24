"""Authored teaching figures. Imported by content.py; no network or AI at runtime."""
def figure(kind,title,caption,items):
    return dict(kind=kind,title=title,caption=caption,items=[dict(label=a,value=b,note=c) for a,b,c in items])
def flow(title,caption,*pairs):return figure('flow',title,caption,[(a,0,b) for a,b in pairs])
DIAGRAMS={
1:figure('beakers','Water left after each step','No new input. Each step keeps 90% of the previous level.',[('Start',.5,'0.5'),('Step 1',.45,'0.45'),('Step 2',.405,'0.405')]),
2:figure('bars','At equilibrium, input replaces the leak','At a level of 2, a 10% leak removes exactly 0.2 per step.',[('Input',.2,'+0.2'),('Leak',.2,'−0.2')]),
3:figure('beakers','The level stays below the line','With β = 0.9 and I = 0.08, the no-reset equilibrium is 0.8. The spike threshold is 1.',[('Start',.2,'0.2'),('Later',.6,'0.6'),('Limit',.8,'0.8')]),
4:flow('Readings move. The reference waits.','One event per reading; θ = 1.',('20.3 → 20.9','No event. Reference stays 20.'),('21.2','UP event: reference becomes 21.'),('Residual','21.2 − 21 = 0.2 remains.')),
5:flow('One event reaches several targets','Each connection that processes a spike adds one SynOp.',('One spike','An event leaves the source neuron.'),('128 connections','The event reaches 128 targets.'),('128 SynOps','Three such spikes give 384.')),
6:figure('bars','Activity against an example budget','Illustrative rates from one hypothetical setup; lower activity alone does not measure energy.',[('Break-even',6.4,'6.4%'),('SNN activity',8.3,'8.3%')]),
7:figure('spikes','Three events in ten steps','Each vertical mark is a spike; empty steps still count toward the window.',[('Neuron',0,'2,5,9')]),
8:figure('curve','The hard spike is a switch','Output stays 0 below threshold and jumps to 1 at θ. A small change on either flat side gives no slope.',[('0',0,''),('0.8',0,''),('θ',1,''),('1.2',1,'')]),
9:figure('curve','A slope for the backward pass','This proxy peaks near threshold. It does not change the forward spike into a probability.',[('−2',.111,''),('−1',.25,''),('θ',1,''),('+1',.25,''),('+2',.111,'')]),
10:figure('spikes','A minimum gap between spikes','With a 4 ms minimum separation, the ceiling is 250 spikes/s. Each position here represents 1 ms.',[('Earliest train',0,'1,5,9')]),
11:figure('spikes','Different times, equal counts','Both trains contain three spikes in the same ten-step window.',[('Train A',0,'2,5,9'),('Train B',0,'1,6,10')]),
12:figure('spikes','The first event carries the value','For this earlier-is-stronger encoder, A represents the stronger input. Each position is 1 ms.',[('Input A',0,'3'),('Input B',0,'8')]),
13:flow('Three different questions','Choose the state or count that the question asks for.',('Membrane','Previous voltage × β + input'),('Delta reference','Last sent value ± one threshold'),('SynOps','Spike count × fan-out')),
14:figure('spikes','Read left to right: who fires first?','Pre at 3 ms, post at 7 ms: Δt = +4 ms. This conventional pair rule strengthens the connection.',[('Pre',0,'3'),('Post',0,'7')]),
15:figure('bars','A trace fades while it waits','An exponential trace starts at 1 with τ = 10 ms.',[('0 ms',1,'1.000'),('10 ms',.368,'0.368'),('20 ms',.135,'0.135')]),
16:flow('A tag bridges the delay','A later reward acts on whatever eligibility remains.',('Spike timing','Leaves an eligibility tag e.'),('Wait','The tag fades with time.'),('Reward arrives','Weight change = η × R × e.')),
17:figure('bars','Inhibition pushes a rival down','A spikes and sends −0.4 to B. These bars show B’s membrane state.',[('B before',.9,'0.9'),('B after',.5,'0.5')]),
18:figure('beakers','The winner gets a higher line','After a spike, the threshold rises from 1 to 1.2. The same water level is now farther from firing.',[('Before',.8,'θ = 1'),('After',.8,'θ = 1.2')]),
19:flow('Each mechanism has a different job','These mechanisms work together; one does not replace the others.',('STDP','Changes connection weights.'),('Inhibition','Suppresses competing neurons.'),('Homeostasis','Adjusts how easily neurons fire.')),
20:figure('bars','The baseline stays. The extra fades.','Baseline threshold = 1. Bars show only the extra a, keeping 80% per silent step.',[('After spike',.5,'+0.5'),('1 step',.4,'+0.4'),('2 steps',.32,'+0.32')]),
21:figure('bars','A small loss means a longer memory','Approximate memory, in steps: 1/(1−ρ). This approximation works best near ρ = 1.',[('ρ = 0.9',10,'10 steps'),('ρ = 0.95',20,'20 steps'),('ρ = 0.98',50,'50 steps')]),
22:flow('Two states change at a spike','Voltage and recovery follow different update rules.',('Voltage v','Reset to c.'),('Recovery u','Add d to the existing value.'),('Between spikes','Both states continue evolving.')),
23:figure('network','Inside the learning network','One winner’s feedback is shown. Simplified from Diehl & Cook (2015). Tap a mechanism to see its role.',[('Input spikes',0,'Pixel intensity sets input spike rates.'),('Competition',0,'Excitatory neurons recruit inhibition that suppresses rivals.'),('STDP',0,'Spike timing changes the incoming weights; no digit labels guide these updates.'),('Thresholds',0,'Frequent firing raises the threshold, reducing repeated wins.')]),
24:figure('bars','More response means more influence','Preferences are 2 and 8; response weights are 3 and 1. The weighted estimate is 3.5.',[('Prefers 2',3,'3 votes'),('Prefers 8',1,'1 vote')]),
25:flow('Keep the memories separate','Ask what a state remembers before updating it.',('Reference r','Events already sent.'),('Adaptation a','Recent spiking activity.'),('Recovery u','A slower influence on voltage.')),
26:flow('An open channel still needs a driving force','Outward-positive current: I = g(V−E).',('Conductance g','How open the pathway is.'),('Driving force V−E','How far voltage is from reversal.'),('At V = E','No net current through that channel.')),
27:figure('bars','Same channel, smaller driving force','With g = 0.5, inward-positive current follows E−V.',[('E−V = 4',2,'Current 2'),('E−V = 1',.5,'Current 0.5')])
}

DIAGRAMS[8]['curveStyle']='step'
DIAGRAMS[9]['caption']='Sampled backward slope for k = 1. The proxy peaks near threshold; the forward spike stays binary.'

DIAGRAMS[18]['items'][0]['threshold']=1
DIAGRAMS[18]['items'][1]['threshold']=1.2
