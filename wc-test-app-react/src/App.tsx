/* eslint-disable */
import metaData from "./data/ro-crate-metadata.json"
// Use the version built in the parent.
import "crate-builder-wc/dist/web-component/describo-crate-builder-wc.umd"

import {useState, useEffect, useRef, useLayoutEffect, DOMAttributes} from "react";
import { config } from "process";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['describo-crate-builder']: CustomElement<any>;
    }
  }
}

function DescriboCrateBuilder({crate, profile, onDataChange}: any) {
  const ref = useRef();

  // Initial setting of globalThis.DescriboCrateBuilderConfiguration
  const [describoConfig, setDescriboConfig] = useState<any>(() =>{
    const data = {
      crate,
      profile,
      lookup: {},
    }
    // @ts-ignore
    globalThis.DescriboCrateBuilderConfiguration = data
    return data
  })

  const [configVersion, setConfigVersion] = useState(1)

  useLayoutEffect(() => {
    const { current }: CustomElement<any> = ref;

    current?.addEventListener("save:crate", (event: Event ) => {
        const customEvent = event as CustomEvent;
        onDataChange(customEvent?.detail[0]?.crate, customEvent?.detail[0]?.profile);
      }
    );
  }, [ref]);

  // Update globalThis.DescriboCrateBuilderConfiguration
  useEffect(() => {
    console.log("useEffect", crate, profile)
    const newConfig = {
      crate, profile, lookup: {}
    }
    setDescriboConfig(newConfig)
    // @ts-ignore
    globalThis.DescriboCrateBuilderConfiguration = newConfig
    setConfigVersion(configVersion+1)
  }, [crate, profile])

  console.log("configVersion", configVersion)
  return(
    <>
    <describo-crate-builder
        ref={ref}
        config={"DescriboCrateBuilderConfiguration"}
        configVersion={configVersion}
    />
      <div className="flex flex-col bg-purple-200 p-10 mt-10">
      Contents of globalThis.DescriboCrateBuilderConfiguration in React:
        <div>
        {
          // @ts-ignore
          JSON.stringify(globalThis.DescriboCrateBuilderConfiguration)
        }
        </div>
      </div>
    </>
  )
}

function App() {
  const [data, setData] = useState({
    crate: metaData,
    profile: {}
  })

  function onDataChange(crate: any, profile: any) {
    setData({crate, profile})
  }

  console.log("data", data)
  return (
    <div className="flex">
      <div>
      <DescriboCrateBuilder
        crate={data.crate}
        profile={data.profile}
        onDataChange={onDataChange}
      />
        <div>
          {/*// @ts-ignore*/}
          <button className="bg-blue-500" onClick={() => setData({crate:{"@context":"Updated crate"}, profile:{name:"Updated profile"}})}>Change crate</button>
        </div>
      </div>
      <div className="w-1/2 bg-green-200">
        <div className="border-b-2 border-gray-700">
          <h1 className="m-2 text-2xl">Preview Crate</h1>
        </div>
        <pre className="border-l-2 border-gray-300 p-2 overflow-scroll text-gray-700">
          {JSON.stringify(data.crate, undefined, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
