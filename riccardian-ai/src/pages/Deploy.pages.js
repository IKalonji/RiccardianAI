import React, { useState, useRef, useEffect } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import Confetti from 'react-confetti';
import { Button } from 'primereact/button';

const Deploy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [renderState, setRenderState] = useState(null)

  const items = [
    {
      label: 'Contracts',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
        setRenderState("Contracts")
      },
    },
    {
      label: 'Deploying',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Second Step', detail: event.item.label });
        setRenderState("Deploying")
      },
    },
    {
      label: 'Done',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Third Step', detail: event.item.label });
        setShowConfetti(true); // Start rendering confetti
        setRenderState("Done")
      },
    },
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false); // Stop rendering confetti after 4 seconds
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div>
      <div className="card">
        <Toast ref={toast}></Toast>
        <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
        { renderState === "Contracts" ?(<Button label="Contract" icon="pi pi-plus" className="mr-2"  text raised/>):
        renderState === "Deploying" ? (<Button label="Deploying" icon="pi pi-plus" className="mr-2"  text raised/>):
        renderState === "Done" ? (<Button label="Done" icon="pi pi-plus" className="mr-2"  text raised/>):
        (<Button label="DNothing to show" icon="pi pi-plus" className="mr-2"  text raised/>)
        }
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    </div>
  );
};

export default Deploy;
