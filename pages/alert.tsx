import Link from "next/link";
import { FormEvent, useState } from "react";
import { AlertInterface } from "../interfaces/alert/alert.interface";

export default function AlertPage() {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [alerts, setAlerts] = useState<AlertInterface[]>([]);

  function handleDate(event:FormEvent<HTMLInputElement>) {
    console.log('event.currentTarget.value', event.currentTarget.value);
    
    setDate(event.currentTarget.value)
  }

  function handleTime(event:FormEvent<HTMLInputElement>) {
    console.log('event.currentTarget.value', event.currentTarget.value);

    setTime(event.currentTarget.value)
  }

  function handleText(event:FormEvent<HTMLInputElement>) {
    console.log('event.currentTarget.value', event.currentTarget.value);

    setText(event.currentTarget.value)
  }

  function reset() {
    setDate('')
    setTime('')
    setText('')
  }

  function addAlert(e: FormEvent<HTMLFormElement>): void {
    console.log('date', date);
    console.log('time', time);
    console.log('text', text);
    e.preventDefault()
      const newAlert: AlertInterface = {
        id: Date.now().toString(),
        date: new Date(date),
        time,
        text,
      }
  
      setAlerts([newAlert, ...alerts])

      reset()
      notifyMe()
  }

  function notifyMe() {
    console.log('a', "Notification" in window);
      console.log('Notification', Notification.permission);
      
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log('b');
      
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!1", {
        requireInteraction: true 
      });
      // …
    } else if (Notification.permission !== "denied") {
      console.log('c');
      
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!2", {
            requireInteraction: true 
          });
          // …
        }
      });
    }
    console.log('d');
    
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  return <div>
    <Link href="/">Home</Link>
    <h1>Alert</h1> 
    <div>
      <h2>New Alert</h2>
      <form action="" onSubmit={addAlert}>
        <input type="date" value={date} onChange={handleDate} />
        <input type="time" value={time} onChange={handleTime} />
        <input type="textarea" value={text} onChange={handleText} />
        <button>Create</button>
      </form>
    </div>
    <div>
      <h2>Alerts</h2>
      <ul>
        {alerts.map(alert => 
          <div key={alert.id}>
            <p>{alert.text}</p>
            <div>{`${alert.date} --- ${alert.time}`}</div>
          </div>
        )}
      </ul>
    </div>
  </div>
}