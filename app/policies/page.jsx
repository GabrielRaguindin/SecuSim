"use client"

import React, { useState } from 'react'
import { Card, Button, Modal, Checkbox, Label } from 'flowbite-react'
import { SiOpenaccess } from "react-icons/si";
import { TbCloudDataConnection } from "react-icons/tb";
import { RiFireLine } from "react-icons/ri";

const page = () => {

  const [openModalAccess, setOpenModalAccess] = useState(false);
  const [openModalQuality, setOpenModalQuality] = useState(false);
  const [openModalFirewall, setOpenModalFirewall] = useState(false);

  const [accessSettings, setAccessSettings] = useState({
    remoteDesktopAccess: false,
    fileTransferAccess: false,
    sshAccess: false,
    adminPrivileges: false,
  });

  const [qualitySettings, setQualitySettings] = useState({
    voip: false,
    limitP2P: false,
    throttleBulkData: false,
    prioritizeStreaming: false,
  });

  const [firewallSettings, setFirewallSettings] = useState({
    blockUntrustedIPs: false,
    allowWebTraffic: false,
    blockPingRequest: false,
    restrictOutboundTraffic: false,
  });

  const handleSavePolicy = async (policyType, settings) => {
    try {
      const response = await fetch('/api/savePolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policyType, settings }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  return (

    <div>
      <div className='text-center text-3xl font-bold text-stone-600 py-5'> Policy Templates </div>

      <div className='flex flex-col justify-center p-5 gap-5'>
        <Card className='w-[100%] shadow-xl'>
          <SiOpenaccess className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Access Control Policy </h5>
          <p className='text-stone-600'>
          Access control policy function by authenticating user credentials, proving their identity, 
          and allowing the pre-approved permissions associated with their username and IP address. </p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalAccess(true)}> View Details </Button>
          </div>
        </Card>

        <Card className='w-[100%] shadow-xl'>
          <TbCloudDataConnection className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Quality of Service Policy </h5>
          <p className='text-stone-600'>
            Quality of service policy is the use of mechanisms or technologies that work on a network 
            to control traffic and ensure the performance of critical applications with limited network capacity. </p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalQuality(true)}> View Details </Button>
          </div>
        </Card>

        <Card className='w-[100%] shadow-xl'>
          <RiFireLine className='text-6xl text-stone-600' />
          <h5 className='text-2xl font-medium text-stone-600'> Firewall Policy </h5>
          <p className='text-stone-600'>
            Firewall policy is a set of rules and standards designed to control network traffic
            between an organization's internal network and the internet. It helps to guard against potential security threats. </p>

          <div className='flex justify-end'>
            <Button gradientMonochrome='teal'
              className='flex w-[30%] shadow-md transform hover:scale-105 active:scale-100 transition duration-300'
              onClick={() => setOpenModalFirewall(true)}> View Details </Button>
          </div>
        </Card>
      </div>

      {/* Access Control Policy Modal */}
      <Modal show={openModalAccess} onClose={() => setOpenModalAccess(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Access Control Policy</Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'>Considered a key component in a security plan, access control policies 
            refer to rules or policies that limit unauthorized physical or logical access to sensitive data.</p>

          <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
          <div className="space-y-3 ml-5">
            <div className="flex items-center gap-2">
              <Checkbox checked={accessSettings.remoteDesktopAccess} onChange={(e) => setAccessSettings({ ...accessSettings, remoteDesktopAccess: e.target.checked })} />
              <Label> Remote Desktop Access </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={accessSettings.fileTransferAccess} onChange={(e) => setAccessSettings({ ...accessSettings, fileTransferAccess: e.target.checked })} />
              <Label> File Transfer Protocol Access </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={accessSettings.sshAccess} onChange={(e) => setAccessSettings({ ...accessSettings, sshAccess: e.target.checked })} />
              <Label> Secure Shell (SSH) Access </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={accessSettings.adminPrivileges} onChange={(e) => setAccessSettings({ ...accessSettings, adminPrivileges: e.target.checked })} />
              <Label> Administrative Privileges </Label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color="gray" onClick={() => setOpenModalAccess(false)}
            className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
            Close
          </Button>
          <Button onClick={() => { handleSavePolicy('AccessControl', accessSettings); setOpenModalAccess(false); }}
            gradientMonochrome='teal'
            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Quality of Service Policy Modal */}
      <Modal show={openModalQuality} onClose={() => setOpenModalQuality(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Quality of Service Policy</Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'> QoS is typically applied to networks that carry traffic for resource-intensive systems. 
            Common services for which it is required include data transmission, online gaming, streaming media, and Voice over IP. </p>

          <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
          <div className="space-y-3 ml-5">
            <div className="flex items-center gap-2">
              <Checkbox checked={qualitySettings.voip} onChange={(e) => setQualitySettings({ ...qualitySettings, voip: e.target.checked })} />
              <Label> Voice over Internet Protocol (VoiP) </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={qualitySettings.limitP2P} onChange={(e) => setQualitySettings({ ...qualitySettings, limitP2P: e.target.checked })} />
              <Label> Limit Peer-to-Peer (P2P) Traffic </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={qualitySettings.throttleBulkData} onChange={(e) => setQualitySettings({ ...qualitySettings, throttleBulkData: e.target.checked })} />
              <Label> Throttle Bulk Data Transfers </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={qualitySettings.prioritizeStreaming} onChange={(e) => setQualitySettings({ ...qualitySettings, prioritizeStreaming: e.target.checked })} />
              <Label> Prioritize Streaming Services & Limit Online Gaming Traffic </Label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color="gray" onClick={() => setOpenModalQuality(false)}
            className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
            Close
          </Button>
          <Button onClick={() => { handleSavePolicy('QoS', qualitySettings); setOpenModalQuality(false); }}
            gradientMonochrome='teal'
            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Firewall Policy Modal */}
      <Modal show={openModalFirewall} onClose={() => setOpenModalFirewall(false)}>
        <Modal.Header className='bg-gradient-to-r from-teal-400 from-10% to-teal-700 to-90%'>Firewall Policy</Modal.Header>
        <Modal.Body>
          <p className='text-stone-600 mb-3'> Firewalls are typically used to gate the borders of a private network or its host devices. 
            As such, firewalls are one security tool in the broader category of user access control. </p>

          <h3 className='text-stone-600 font-bold mb-3'> Controls </h3>
          <div className="space-y-3 ml-5">
            <div className="flex items-center gap-2">
              <Checkbox checked={firewallSettings.blockUntrustedIPs} onChange={(e) => setFirewallSettings({ ...firewallSettings, blockUntrustedIPs: e.target.checked })} />
              <Label> Block Untrusted IP Addresses </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={firewallSettings.allowWebTraffic} onChange={(e) => setFirewallSettings({ ...firewallSettings, allowWebTraffic: e.target.checked })} />
              <Label> Allow Web Traffic (HTTP/HTTPS) </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={firewallSettings.blockPingRequests} onChange={(e) => setFirewallSettings({ ...firewallSettings, blockPingRequests: e.target.checked })} />
              <Label> Block Incoming Ping Requests </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox checked={firewallSettings.restrictOutboundTraffic} onChange={(e) => setFirewallSettings({ ...firewallSettings, restrictOutboundTraffic: e.target.checked })} />
              <Label> Restrict Outbound Traffic to Specific Ports </Label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button color="gray" onClick={() => setOpenModalFirewall(false)}
            className='text-stone-600 border-stone-400 shadow-md 
                      transform hover:scale-105 active:scale-100 transition duration-300'>
            Close
          </Button>
          <Button onClick={() => { handleSavePolicy('Firewall', firewallSettings); setOpenModalFirewall(false); }}
            gradientMonochrome='teal'
            className='shadow-md transform hover:scale-105 active:scale-100 transition duration-300'>Save</Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default page