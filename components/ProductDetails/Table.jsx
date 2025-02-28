export const Table = ({ openModal, setOpenModal }) => {
  return (
    <div
      className={
        openModal
          ? `border-l translate-x-0 fixed top-0 right-0 bg-white transition-all duration-500 z-[2100] h-screen w-[50%] max-md:w-full`
          : `border-l translate-x-full fixed top-0 right-0 bg-white transition-all duration-500 z-[2100] h-screen w-[50%] max-md:w-full`
      }
    >
      <div className={`p-5 overflow-y-auto h-full`}>
        <h2 className={`text-[1.2rem] w-full pb-2 border-b`}>
          Tabele mera za žene (gornji deo)
        </h2>
        <div className={`mt-5`}>
          <table className={`w-full`}>
            <thead>
              <tr className={`border-b`}>
                <th className={`text-left`}></th>
                <th className={`text-left`}>XS</th>
                <th className={`text-left`}>S</th>
                <th className={`text-left`}>M</th>
                <th className={`text-left`}>L</th>
                <th className={`text-left`}>XL</th>
                <th className={`text-left`}>XXL</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left py-2 px-2 font-bold`}>Obim grudi</td>
                <td className={`text-left`}>80-84</td>
                <td className={`text-left`}>84-88</td>
                <td className={`text-left`}>88-92</td>
                <td className={`text-left`}>92-96</td>
                <td className={`text-left`}>89-102</td>
                <td className={`text-left`}>102-106</td>
              </tr>
              <tr className={`border-b !py-2`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim struka</td>
                <td className={`text-left`}>60-64</td>
                <td className={`text-left`}>64-68</td>
                <td className={`text-left`}>68-72</td>
                <td className={`text-left`}>72-76</td>
                <td className={`text-left`}>78-82</td>
                <td className={`text-left`}>82-86</td>
              </tr>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left px-2 py-2 font-bold`}>Obim kukova</td>
                <td className={`text-left`}>88-92</td>
                <td className={`text-left`}>92-96</td>
                <td className={`text-left`}>96-100</td>
                <td className={`text-left`}>100-104</td>
                <td className={`text-left`}>106-110</td>
                <td className={`text-left`}>110-114</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
          Tabele mera za žene (donji deo)
        </h2>
        <div className={`mt-5`}>
          <table className={`w-full`}>
            <thead>
              <tr className={`border-b`}>
                <th className={`text-left`}></th>
                <th className={`text-left`}>27</th>
                <th className={`text-left`}>28</th>
                <th className={`text-left`}>29</th>
                <th className={`text-left`}>30</th>
                <th className={`text-left`}>31</th>
                <th className={`text-left`}>32</th>
                <th className={`text-left`}>33</th>
                <th className={`text-left`}>34</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim struka</td>
                <td className={`text-left`}>62-65</td>
                <td className={`text-left`}>65-68</td>
                <td className={`text-left`}>68-72</td>
                <td className={`text-left`}>72-74</td>
                <td className={`text-left`}>74-78</td>
                <td className={`text-left`}>78-82</td>
                <td className={`text-left`}>82-28</td>
                <td className={`text-left`}>68-92</td>
              </tr>
              <tr className={`border-b !py-2`}>
                <td className={`text-left py-2 pl-2 font-bold`}>Obim kukova</td>
                <td className={`text-left`}>90-93</td>
                <td className={`text-left`}>93-96</td>
                <td className={`text-left`}>96-99</td>
                <td className={`text-left`}>99-102</td>
                <td className={`text-left`}>102-106</td>
                <td className={`text-left`}>105-110</td>
                <td className={`text-left`}>110-114</td>
                <td className={`text-left`}>114-118</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
          Tabele mera za muškarce (gornji deo)
        </h2>
        <div className={`mt-5`}>
          <table className={`w-full`}>
            <thead>
              <tr className={`border-b`}>
                <th className={`text-left`}></th>
                <th className={`text-left`}>S</th>
                <th className={`text-left`}>M</th>
                <th className={`text-left`}>L</th>
                <th className={`text-left`}>XL</th>
                <th className={`text-left`}>2XL</th>
                <th className={`text-left`}>3XL</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim grudi</td>
                <td className={`text-left`}>96-100</td>
                <td className={`text-left`}>100-104</td>
                <td className={`text-left`}>104-108</td>
                <td className={`text-left`}>110-114</td>
                <td className={`text-left`}>114-118</td>
                <td className={`text-left`}>118-112</td>
              </tr>
              <tr className={`border-b !py-2`}>
                <td className={`text-left py-2 pl-2 font-bold`}>Obim struka</td>
                <td className={`text-left`}>80-84</td>
                <td className={`text-left`}>84-88</td>
                <td className={`text-left`}>88-92</td>
                <td className={`text-left`}>94-98</td>
                <td className={`text-left`}>98-102</td>
                <td className={`text-left`}>102-104</td>
              </tr>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim kukova</td>
                <td className={`text-left`}>98-102</td>
                <td className={`text-left`}>102-106</td>
                <td className={`text-left`}>106-110</td>
                <td className={`text-left`}>112-116</td>
                <td className={`text-left`}>116-120</td>
                <td className={`text-left`}>120-124</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
          Tabele mera za muškarce (donji deo)
        </h2>
        <div className={`mt-5`}>
          <table className={`w-full`}>
            <thead>
              <tr className={`border-b`}>
                <th className={`text-left`}></th>
                <th className={`text-left`}>30</th>
                <th className={`text-left`}>31</th>
                <th className={`text-left`}>32</th>
                <th className={`text-left`}>33</th>
                <th className={`text-left`}>34</th>
                <th className={`text-left`}>36</th>
                <th className={`text-left`}>38</th>
                <th className={`text-left`}>40</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim struka</td>
                <td className={`text-left`}>78-81</td>
                <td className={`text-left`}>81-84</td>
                <td className={`text-left`}>84-87</td>
                <td className={`text-left`}>87-90</td>
                <td className={`text-left`}>90-94</td>
                <td className={`text-left`}>94-98</td>
                <td className={`text-left`}>98-102</td>
                <td className={`text-left`}>102-106</td>
              </tr>

              <tr className={`border-b !py-2`}>
                <td className={`text-left py-2 font-bold pl-2`}>Obim kukova</td>
                <td className={`text-left`}>96-99</td>
                <td className={`text-left`}>99-102</td>
                <td className={`text-left`}>102-105</td>
                <td className={`text-left`}>105-108</td>
                <td className={`text-left`}>108-112</td>
                <td className={`text-left`}>112-116</td>
                <td className={`text-left`}>116-120</td>
                <td className={`text-left`}>120-124</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
