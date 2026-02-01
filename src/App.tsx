import { FieldConditions } from "./field/FieldConditions";
import Panels from "./player/players";

export default function App() {
  return (
    <div className="dark min-h-screen bg-linear-to-r from-[#1a1a1a] to-[#1f1f1f] p-2">
      <div className="max-w-225 mx-auto space-y-2">
        {/* Side-by-Side Pokémon Panels */}
        <Panels />
        {/* Field Conditions - Bottom */}
        <FieldConditions />
      </div>
    </div>
  );
}
