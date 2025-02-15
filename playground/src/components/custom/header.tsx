import { Icon } from "./Icon";

export const Header = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex items-center gap-2 p-4 justify-between  max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2">
          <Icon className="w-10 h-10" />
          <span className="text-xl font-bold">InTextbox Playground</span>
        </div>
        <div>
          <p>AI-powered text editor</p>
        </div>
      </div>
    </div>
  );
};
