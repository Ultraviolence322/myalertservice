import Link from "next/link";
import { FormEvent, useState } from "react";
import { AlertInterface } from "../interfaces/alert/alert.interface";

export default function AlertPage() {
  const [date, setDate] = useState<number | string>(Date.now());
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [text, setText] = useState('');
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

  function addAlert(e: FormEvent<HTMLFormElement>): void {
    console.log('date', date);
    console.log('time', time);
    console.log('text', text);
    const newAlert: AlertInterface = {
      id: Date.now().toString(),
      date: new Date(date),
      time,
      text,
    }
    e.preventDefault()

    setAlerts([newAlert, ...alerts])
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