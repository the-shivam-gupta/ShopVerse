const SocialNetworks = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Social Networks</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between border p-4 rounded">
          <span>Google</span>
          <button className="text-red-500 font-semibold">Unlink</button>
        </div>
        <div className="flex items-center justify-between border p-4 rounded">
          <span>Facebook</span>
          <button className="text-blue-500 font-semibold">Link</button>
        </div>
      </div>
    </div>
  );
};

export default SocialNetworks;